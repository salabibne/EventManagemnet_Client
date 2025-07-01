import React from "react";
import { Form, Input, DatePicker, Button, Modal } from "antd";
import dayjs from "dayjs";
import api from "../services/api";

const { TextArea } = Input;

const AddEvent = () => {
  const [form] = Form.useForm();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = React.useState(false);

  const disabledDate = (current) => current && current < dayjs().startOf("day");

  const handleSubmit = async (values) => {
    try {
      const payload = {
        title: values.title,
        hostName: values.hostName,
        dateTime: values.dateTime.toISOString(),
        location: values.location,
        description: values.description,
      };

      const response = await api.post("/events", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setIsSuccessModalVisible(true);
        form.resetFields();
      } else {
        Modal.warning({
          title: "Unexpected Response",
          content: "Event submitted, but server responded unexpectedly.",
        });
      }
    } catch (error) {
      if (error.response?.data?.message) {
        Modal.error({
          title: "Error",
          content: error.response.data.message,
        });
      } else {
        Modal.error({
          title: "Failed to Add Event",
          content: " Something went wrong. Please try again later.",
        });
      }
    }
  };

  const handleModalOk = () => {
    setIsSuccessModalVisible(false);
    
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Add Event</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Event Title" rules={[{ required: true }]}>
          <Input placeholder="Enter event title" />
        </Form.Item>

        <Form.Item name="hostName" label="Host Name" rules={[{ required: true }]}>
          <Input placeholder="Enter host name" />
        </Form.Item>

        <Form.Item name="dateTime" label="Date & Time" rules={[{ required: true }]}>
          <DatePicker
            showTime={{ use12Hours: true, format: "hh:mm A" }}
            disabledDate={disabledDate}
            style={{ width: "100%" }}
            format="YYYY-MM-DD hh:mm A"
          />
        </Form.Item>

        <Form.Item name="location" label="Location" rules={[{ required: true }]}>
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <TextArea rows={3} placeholder="Enter event description" />
        </Form.Item>

        <Button htmlType="submit" type="primary" block>
          Add Event
        </Button>
      </Form>

      <Modal
        title="Event Added Successfully!"
        visible={isSuccessModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsSuccessModalVisible(false)}
        okText="Great!"
        centered
        maskClosable={false}
      >
        <p> Your event has been successfully added.</p>
      </Modal>
    </div>
  );
};

export default AddEvent;
