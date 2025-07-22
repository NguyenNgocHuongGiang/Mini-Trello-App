import { Modal, Input } from "antd";
import type { CardResponse } from "../../../../types/types";
import "./../../style.css";

interface ConfirmDeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  cardToDelete: CardResponse | null;
  deleteConfirmName: string;
  setDeleteConfirmName: (name: string) => void;
}

const ConfirmDeleteModal = ({
  open,
  onCancel,
  onConfirm,
  cardToDelete,
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
        disabled: deleteConfirmName !== cardToDelete?.name,
        style: {
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          color: "white",
          opacity: deleteConfirmName !== cardToDelete?.name ? 0.5 : 1,
          cursor:
            deleteConfirmName !== cardToDelete?.name
              ? "not-allowed"
              : "pointer",
        },
      }}
      className="custom-modal"
    >
      <p className="my-4">
        Please type the name of the card <b>{cardToDelete?.name}</b> to
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
