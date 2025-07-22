import { sendInviteEmail } from "../utils/mailer.js";

export const getAllCards = async (db, boardId, userId) => {
  const [cardsSnap, boardsSnap] = await Promise.all([
    db.ref(`cards/${boardId}`).once('value'),
    db.ref(`boards/${boardId}`).once('value')
  ]);

  const cards = cardsSnap.val() || {};
  const board = boardsSnap.val();
  const boardOwnerId = board?.userId;

  return Object.values(cards)
    .filter(card => boardOwnerId === userId || card.list_member?.includes(userId))
    .map(card => ({
      id: card.id,
      name: card.name,
      description: card.description
    }));
};

export const getCardById = async (db, boardId, cardId) => {
  const snapshot = await db.ref(`cards/${boardId}/${cardId}`).once('value');
  const card = snapshot.val();
  if (!card) return null;
  return {
    id: card.id,
    name: card.name,
    description: card.description
  };
};

export const getCardsByUser = async (db, boardId, userId) => {
  const snapshot = await db.ref(`cards/${boardId}`).once('value');
  const cards = snapshot.val() || {};
  return Object.values(cards)
    .filter(card => card.list_member?.includes(userId))
    .map(card => ({
      id: card.id,
      name: card.name,
      description: card.description,
      tasks_count: card.tasks_count || 0,
      list_member: card.list_member || [],
      createdAt: card.createdAt || null
    }));
};

export const createCard = async (db, boardId, data) => {
  const ref = db.ref(`cards/${boardId}`).push();
  const card = {
    id: ref.key,
    name: data.name,
    description: data.description,
    createdAt: data.createdAt || new Date().toISOString(),
    list_member: data.list_member || [],
    tasks_count: 0,
  };
  await ref.set(card);
  return {
    id: ref.key,
    name: card.name,
    description: card.description
  };
};

export const updateCard = async (db, boardId, cardId, data) => {
  const ref = db.ref(`cards/${boardId}/${cardId}`);
  await ref.update(data);
  const updated = await ref.once('value');
  const card = updated.val();
  return {
    id: card.id,
    name: card.name,
    description: card.description
  };
};

export const deleteCard = async (db, boardId, cardId) => {
  await db.ref(`cards/${boardId}/${cardId}`).remove();
};

export const inviteToBoard = async (db, boardId, invitation) => {
  console.log(invitation);
  
  await db.ref(`/boards/${boardId}/boardInvites/${invitation.invite_id}`).set({
    ...invitation,
    boardId,
    createdAt: new Date().toISOString()
  });
  if (invitation.email_member) {
    await sendInviteEmail(invitation.email_member, boardId, invitation.cardId, invitation.invite_id)
  }
  return { success: true };
};

export const acceptCardInvite = async (db, boardId, { invite_id, member_id, status }) => {
  console.log(invite_id);
  
  const inviteRef = db.ref(`/boards/${boardId}/boardInvites/${invite_id}`);
  await inviteRef.update({ status });

  if (status === 'accepted') {
    const cardRef = db.ref(`boards/${boardId}/list_member`);
    const snapshot = await cardRef.once('value');
    const members = snapshot.val() || [];
    if (!members.includes(member_id)) {
      members.push(member_id);
      await cardRef.set(members);
    }
  }
  return { success: true };
};
