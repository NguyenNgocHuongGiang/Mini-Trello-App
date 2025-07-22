import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { TaskResponse } from "../../../../types/types";
import { Modal, Dropdown, Menu, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import CreateCardModal from "./CreateCardModal";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useParams } from "react-router-dom";
import { deleteCard } from "../../../../store/slice/cardSlice";

interface CardResponse {
  id: string;
  name: string;
  description: string;
  tasks: TaskResponse[];
  boardId?: string;
}

export const CardView = ({ card }: { card: CardResponse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  const [cardToDelete, setCardToDelete] = useState<CardResponse | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { boardId } = useParams();

  const handleAddTask = () => {
    console.log("New Task:", {
      title: newTaskTitle,
      cardId: card.id,
    });

    setIsModalOpen(false);
    setNewTaskTitle("");
  };

  const onDelete = (card: CardResponse) => {
    setCardToDelete(card);
    setDeleteModalVisible(true);
    setDeleteConfirmName("");
  };

  const confirmDelete = () => {
    if (
      deleteConfirmName === cardToDelete?.name &&
      cardToDelete?.id &&
      boardId
    ) {
      dispatch(deleteCard({ boardId: boardId, cardId: cardToDelete.id }));
      toast.success("Delete successfully");
      setDeleteModalVisible(false);
    }
  };

  return (
    <>
      <Droppable droppableId={card.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-64 bg-gray-800 rounded p-3 flex-shrink-0 min-h-[100px] flex flex-col justify-between"
            style={{ height: "100%" }}
          >
            {/* Content Area */}
            <div className="flex flex-col overflow-auto flex-grow min-h-0">
              <div className="flex justify-between items-center text-white mb-3">
                <span className="text-lg font-semibold">{card.name}</span>

                <Dropdown
                  className="!text-white"
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="edit"
                        onClick={() => {
                          setEditMode(true);
                        }}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item key="delete" onClick={() => onDelete(card)}>
                        Delete
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button
                    type="text"
                    icon={<EllipsisOutlined />}
                    className="text-white hover:text-gray-300"
                  />
                </Dropdown>
              </div>

              <hr className="mb-3" />

              {card.tasks.map((task, index) => (
                <Draggable draggableId={task.id} index={index} key={task.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-2 mb-2 rounded shadow cursor-move text-black"
                    >
                      {task.title}
                      <div className="my-1">
                        <span className="bg-amber-100 px-2 py-1 text-xs">
                          {task.status}
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>

            {/* Fixed Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 p-2 bg-gray-600 w-full text-white text-sm hover:bg-gray-700"
            >
              + Add Task
            </button>
          </div>
        )}
      </Droppable>

      <Modal
        title="Add Task"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddTask}
        okText="Add"
      >
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-full p-2 border rounded mt-2"
          placeholder="Task title"
        />
      </Modal>

      {editMode && (
        <CreateCardModal
          open={editMode}
          onClose={() => setEditMode(false)}
          data={{ ...card, boardId: card.boardId! }}
        />
      )}

      <ConfirmDeleteModal
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
        cardToDelete={cardToDelete}
        deleteConfirmName={deleteConfirmName}
        setDeleteConfirmName={setDeleteConfirmName}
      />
    </>
  );
};
