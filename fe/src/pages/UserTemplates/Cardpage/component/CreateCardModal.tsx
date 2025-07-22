import { Modal, Input, Form } from "antd";
import "./../../style.css";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../../store";
import { createCard, updateCard } from "../../../../store/slice/cardSlice";
import { toast } from "react-toastify";
import type { BoardResponse, CardResponse } from "../../../../types/types";
import { useEffect } from "react";


interface Props {
  open: boolean;
  onClose: () => void;
  boardDetail?: BoardResponse;
  data?: CardResponse & { boardId: string };
}

const CreateCardModal = ({ open, onClose, boardDetail, data }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(data);
    
    if (data) {
      form.setFieldsValue({
        name: data.name,
        description: data.description,
        // params: data.params
      });
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const handleOk = () => {
    console.log(data);

    form
      .validateFields()
      .then((values) => {
        console.log(values);

        if (data) {
          const updateData = {
            cardId: data.id,
            boardId: data.boardId,
            values: {
              ...values,
              params: values.params || "",
            },
          };

          const dataResponse = dispatch(updateCard(updateData))
        } else {
          if (!boardDetail?.id) return;
          const newCard = {
            boardId: boardDetail?.id,
            values,
          };
          dispatch(createCard(newCard));
        }
        form.resetFields();
        toast.success("Create card successfully");
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <div className="text-white text-md uppercase pb-3">
          {data ? "Edit Card" : "Create Card"}
        </div>
      }
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={data ? "Update" : "Create"}
      className="custom-modal text-white"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={<span className="text-white">Card Name</span>}
          rules={[{ required: true, message: "Please enter card name" }]}
        >
          <Input
            placeholder="Enter list name"
            className="custom-input !bg-gray-700 !text-white"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label={<span className="text-white">Card Name</span>}
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea
            placeholder="Enter description (optional)"
            className="custom-input !bg-gray-700 !text-white"
          />
        </Form.Item>
        {data && (
          <Form.Item
            name="params"
            label={<span className="text-white">Params (Note)</span>}
          >
            <Input
              placeholder="Enter params"
              className="custom-input !bg-gray-700 !text-white"
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CreateCardModal;
