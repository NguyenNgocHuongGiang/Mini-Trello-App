import { Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../../store";
import "./../../style.css";
import { createBoard, updateBoard } from "../../../../store/slice/boardSlice";
import type { BoardResponse } from "../../../../types/types";
import { toast } from "react-toastify";

interface BoardModalProps {
  open: boolean;
  onClose: () => void;
  data: BoardResponse | null;
}

const BoardModal = ({ open, onClose, data }: BoardModalProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        description: data.description,
      });
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      if (data) {
        await dispatch(updateBoard({ id: data.id, ...values })).unwrap();
        toast.success("Board updated successfully!");
      } else {
        await dispatch(createBoard(values)).unwrap();
        toast.success("Board created successfully!");
      }
      onClose();
      form.resetFields();
    } catch (error) {
      toast.error("Failed to create board.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<div className="text-white text-md uppercase pb-3"> {data ? "Update board" : "Create new board"}</div>}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText={data ? "Update" : "Create"}
      className="custom-modal"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={<span className="text-white">Name</span>}
          name="name"
          rules={[{ required: true, message: "Please enter board name" }]}
        >
          <Input
            placeholder="Enter board name"
            className="!bg-gray-800 !text-white custom-input"
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-white">Description</span>}
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea
            placeholder="Enter description"
            rows={4}
            className="!bg-gray-800 !text-white custom-input"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BoardModal;
