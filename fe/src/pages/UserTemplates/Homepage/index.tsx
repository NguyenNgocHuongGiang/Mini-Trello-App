import { Button, Card, Dropdown, Menu } from "antd";
import Sidebar from "./component/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { deleteBoard, getBoardByUserId } from "../../../store/slice/boardSlice";
import type { BoardResponse } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import BoardModal from "./component/BoardModal";
import { EllipsisOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "./component/ConfirmDeleteModal";

const Homepage = () => {
  const { userBoard } = useSelector((state: RootState) => state.boardReducer);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardResponse | null>(
    null
  );
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<BoardResponse | null>(
    null
  );
  const [deleteConfirmName, setDeleteConfirmName] = useState("");

  useEffect(() => {
    dispatch(getBoardByUserId());
  }, []);

  const onEdit = (board: BoardResponse) => {
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  const onDelete = (board: BoardResponse) => {
    setBoardToDelete(board);
    setDeleteModalVisible(true);
    setDeleteConfirmName("");
  };

  const confirmDelete = () => {
    if (deleteConfirmName === boardToDelete?.name && boardToDelete?.id) {
      dispatch(deleteBoard(boardToDelete.id));
      toast.success("Delete successfully");
      setDeleteModalVisible(false);
    }
  };

  const renderCardBoard = () => {
    return userBoard?.map((board: BoardResponse) => {
      const menu = (
        <Menu
          onClick={({ key }) => {
            if (key === "edit") onEdit(board);
            else if (key === "delete") onDelete(board);
          }}
          items={[
            { label: "Edit", key: "edit" },
            { label: "Delete", key: "delete" },
          ]}
        />
      );

      return (
        <Card
          key={board?.id}
          onClick={() => navigate(`/boards/${board.id}/cards`)}
          className="cursor-pointer transition hover:shadow-lg !bg-gray-300"
          title={
            <div className="flex justify-between items-center">
              <span>{board?.name}</span>
              <div onClick={(e) => e.stopPropagation()}>
                <Dropdown
                  overlay={menu as React.ReactElement}
                  trigger={["click"]}
                >
                  <EllipsisOutlined className="text-xl hover:text-gray-600" />
                </Dropdown>
              </div>
            </div>
          }
        >
          {board?.description}
        </Card>
      );
    });
  };

  return (
    <div className="flex h-screen text-white relative">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto bg-gray-800">
        <h2 className="text-xl font-semibold mb-6 text-white">
          YOUR WORKSPACES
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renderCardBoard()}
          <Button
            onClick={() => {
              setSelectedBoard(null);
              setIsModalOpen(true);
            }}
            className="!p-7 cursor-pointer bg-gray-700 text-white border-gray-600 hover:bg-gray-600 transition"
          >
            + Create a new board
          </Button>
        </div>

        <BoardModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={selectedBoard}
        />

        <ConfirmDeleteModal
          open={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={confirmDelete}
          boardToDelete={boardToDelete}
          deleteConfirmName={deleteConfirmName}
          setDeleteConfirmName={setDeleteConfirmName}
        />
      </main>
    </div>
  );
};

export default Homepage;
