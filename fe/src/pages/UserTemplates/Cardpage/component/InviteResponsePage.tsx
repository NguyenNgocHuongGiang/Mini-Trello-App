import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../../../utils/configApi";
import { getAuthData } from "../../../../utils/helpers";
import type { AuthInfo } from "../../../../types/types";

const InviteResponsePage = () => {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();
  const inviteId = searchParams.get("inviteId");
  const status = searchParams.get("status");
  const [message, setMessage] = useState("Processing your response...");
  const navigate = useNavigate()

  useEffect(() => {
    const respondToInvite = async () => {
      try {
        const infoUser = getAuthData("authInfo") as AuthInfo | null;

        if (inviteId && status && infoUser?.id) {
          await api.post(`/boards/${boardId}/invite/accept`, {
            invite_id: inviteId,
            status,
            member_id: infoUser.id,
          });
          setMessage(`You have ${status} the invitation.`);
          navigate(`/boards/${boardId}/cards`)
        } else {
          setMessage("Invalid or missing invitation data.");
        }
      } catch (error) {
        console.error(error);
        setMessage("There was an error processing your response.");
      }
    };

    respondToInvite();
  }, [inviteId, status, boardId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">{message}</h1>
    </div>
  );
};

export default InviteResponsePage;
