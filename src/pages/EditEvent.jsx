import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Alert } from 'antd';
import dayjs from 'dayjs';
import api from '../services/api';

const { TextArea } = Input;

const EditEventModal = ({ visible, eventId, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/my/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const { title, hostName, dateTime, location, description } = res.data;
        form.setFieldsValue({
          title,
          hostName,
          dateTime: dayjs(dateTime),
          location,
          description,
        });
      } catch (err) {
        setFeedback({ type: 'error', message: 'Failed to load event' });
        setTimeout(() => onClose(), 2000);
      }
    };

    if (eventId && visible) {
      fetchEvent();
      setFeedback({ type: '', message: '' }); 
    }
  }, [eventId, visible]);

  const handleSubmit = async (values) => {
    try {
      await api.put(
        `/events/${eventId}`,
        {
          ...values,
          dateTime: values.dateTime.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFeedback({ type: 'success', message: '✅ Event updated successfully!' });

      setTimeout(() => {
        onSuccess(); // refresh parent
        onClose();   // close modal
        setFeedback({ type: '', message: '' });
      }, 1500);
    } catch (err) {
      setFeedback({ type: 'error', message: '❌ Failed to update event' });
    }
  };

  return (
    <Modal
      title="Edit Event"
      open={visible}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Update"
    >
      {feedback.message && (
        <Alert
          message={feedback.message}
          type={feedback.type}
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Event Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="hostName" label="Host Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="dateTime" label="Date & Time" rules={[{ required: true }]}>
          <DatePicker
            showTime={{ use12Hours: true, format: 'hh:mm A' }}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            style={{ width: '100%' }}
            format="YYYY-MM-DD hh:mm A"
          />
        </Form.Item>

        <Form.Item name="location" label="Location" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditEventModal;
