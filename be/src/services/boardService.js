export const createBoard = async (db, userId, data) => {
  const ref = db.ref('boards').push();
  const board = { ...data, userId, id: ref.key };
  await ref.set(board);
  return {
    id: ref.key,
    ...data
  };
};

export const getBoardsByUserId = async (db, userId) => {
  const snapshot = await db.ref('boards').orderByChild('userId').equalTo(userId).once('value');
  const boards = snapshot.val() || {};
  return Object.values(boards);
};

export const getBoardById = async (db, id) => {
  const snapshot = await db.ref('boards').child(id).once('value');
  return snapshot.exists() ? snapshot.val() : null;
};

export const updateBoard = async (db, id, data) => {
  await db.ref('boards').child(id).update(data);
  const updated = await getBoardById(db, id);
  return updated;
};

export const deleteBoard = async (db, id) => {
  await db.ref('boards').child(id).remove();
};