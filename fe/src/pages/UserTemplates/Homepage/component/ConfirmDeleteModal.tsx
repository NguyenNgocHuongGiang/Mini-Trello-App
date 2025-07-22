import { Modal, Input } from "antd";
import type { BoardResponse } from "../../../../types/types";
import "./../../style.css";

interface ConfirmDeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  boardToDelete: BoardResponse | null;
  deleteConfirmName: string;
  setDeleteConfirmName: (name: string) => void;
}

const ConfirmDeleteModal = ({
  open,
  onCancel,
  onConfirm,
  boardToDelete,
  deleteConfirmName,
  setDeleteConfirmName,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal
      title={
        <span className="text-white text-md uppercase pb-3">
          Confirm Delete
        </span>
      }
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okButtonProps={{
        disabled: deleteConfirmName !== boardToDelete?.name,
        style: {
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          color: "white",
          opacity: deleteConfirmName !== boardToDelete?.name ? 0.5 : 1,
          cursor:
            deleteConfirmName !== boardToDelete?.name
              ? "not-allowed"
              : "pointer",
        },
      }}
      className="custom-modal"
    >
      <p className="my-4">
        Please type the name of the board <b>{boardToDelete?.name}</b> to
        confirm deletion:
      </p>
      <Input
        className="custom-input !bg-gray-700 !text-white"
        value={deleteConfirmName}
        onChange={(e) => setDeleteConfirmName(e.target.value)}
      />
    </Modal>
  );
};

export default ConfirmDeleteModal;
