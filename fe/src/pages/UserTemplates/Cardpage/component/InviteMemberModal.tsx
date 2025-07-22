import { Modal, Input, Form, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store";
import "./../../style.css";
import { inviteToBoard } from "../../../../store/slice/boardSlice";
import { getAuthData } from "../../../../utils/helpers";
import type { AuthInfo } from "../../../../types/types";
import { toast } from "react-toastify";

interface InviteMemberModalProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
}

const InviteMemberModal = ({
  open,
  onClose,
  boardId,
}: InviteMemberModalProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const infoUser = getAuthData("authInfo") as AuthInfo | null;

  const onFinish = async (values: { email: string }) => {
    const invite_id = Math.random().toString(36).substring(2, 12);
    if (!infoUser?.id) return;
    try {
      setLoading(true);
      await dispatch(
        inviteToBoard({
          boardId,
          invite_id,
          board_owner_id: infoUser.id,
          email_member: values.email,
          status: "pending",
        })
      ).unwrap();
      toast.success("Invitation sent successfully!");
      form.resetFields();
      onClose();
    } catch (error: any) {
      message.error(error.message || "Failed to send invitation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Send Invitation"
      confirmLoading={loading}
      title={<div className="pb-5">Invite to board</div>}
      className="custom-modal"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label={<span className="text-white">Email Address</span>}
          rules={[
            { required: true, message: "Please input an email address." },
            { type: "email", message: "Invalid email format." },
          ]}
        >
          <Input
            placeholder="Enter user's email"
            className="custom-input !bg-gray-700 !text-white"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InviteMemberModal;
