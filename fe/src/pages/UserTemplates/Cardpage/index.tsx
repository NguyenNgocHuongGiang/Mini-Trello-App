import { Button } from "antd";
import Sidebar from "./component/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { getBoardDetail } from "../../../store/slice/boardSlice";
import type { CardResponse } from "../../../types/types";
import { useParams } from "react-router-dom";
import { getBoardCardByBoardId } from "../../../store/slice/cardSlice";
import { UserAddOutlined } from "@ant-design/icons";
import { CardView } from "./component/CustomCard";
import { getTaskByBoardIdCardId } from "../../../store/slice/taskSlice";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import CreateCardModal from "./component/CreateCardModal";
import InviteMemberModal from "./component/InviteMemberModal";

const Cardpage = () => {
  const { boardId } = useParams();
  const { boardCard } = useSelector((state: RootState) => state.cardReducer);
  const { taskList = {} } = useSelector(
    (state: RootState) => state.taskReducer
  );
  const { boardDetail } = useSelector((state: RootState) => state.boardReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardDetail(boardId));
      dispatch(getBoardCardByBoardId(boardId));
    }
  }, [boardId]);

  useEffect(() => {
    if (boardCard && boardCard.length > 0 && boardId) {
      boardCard.forEach((card: CardResponse) => {
        dispatch(getTaskByBoardIdCardId({ boardId, cardId: card.id }));
      });
    }
  }, [boardCard, boardId]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // TODO: dispatch update position action if needed
    console.log("Moved from", source, "to", destination);
  };

  return (
    <div className="flex h-screen text-white relative">
      <Sidebar boardDetail={boardDetail} />

      <main className="flex-1 overflow-y-auto">
        <div className="text-white flex items-center justify-between mb-6 bg-[#743254] px-6 py-4">
          <div className="text-xl font-semibold text-white flex items-center justify-center">
            <p>{boardDetail?.name}</p>
          </div>
          <button
            onClick={() => setOpenInviteModal(true)}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-1.5 px-4 rounded"
          >
            <UserAddOutlined />
            Add Member
          </button>
        </div>

        <div className="px-6">
          <Button
            className="cursor-pointer !p-6 !bg-[#A16081] !text-white !border-none"
            onClick={() => setOpenModal(true)}
          >
            + Add another list
          </Button>

          <div className="py-6">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {boardCard?.map((card) => (
                  <CardView
                    key={card.id}
                    card={{
                      ...card,
                      tasks: taskList[card.id] ?? [],
                      boardId,
                    }}
                  />
                ))}
              </div>
            </DragDropContext>
          </div>
        </div>

        {boardDetail && (
          <CreateCardModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            boardDetail={boardDetail}
          />
        )}
      </main>

      {boardId && (
        <InviteMemberModal
          open={openInviteModal}
          onClose={() => setOpenInviteModal(false)}
          boardId={boardId}
        />
      )}
    </div>
  );
};

export default Cardpage;
