import React, { useEffect, useState } from 'react';
import { Card, Button, message } from 'antd';
import dayjs from 'dayjs';
import api from '../services/api';
import EditEventModal from './EditEvent';
import {
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchMyEvents = async () => {
    try {
      const res = await api.get('/events/my', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvents(res.data);
    } catch (err) {
      message.error('Failed to load your events');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      message.success('Event deleted');
      fetchMyEvents();
    } catch (err) {
      message.error('Delete failed');
    }
  };

  const openEditModal = (id) => {
    setEditingEventId(id);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setEditingEventId(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">My Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <Card key={event._id} title={event.title}>
            <p>
              <CalendarOutlined className="mr-2 text-blue-500" />
              <strong>Date:</strong>{' '}
              {dayjs(event.dateTime).format('MMM DD, YYYY hh:mm A')}
            </p>
            <p>
              <EnvironmentOutlined className="mr-2 text-green-500" />
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <UserOutlined className="mr-2 text-purple-500" />
              <strong>Attendees:</strong> {event.attendeeCount}
            </p>
            <div className="flex justify-between mt-4">
              <Button type="primary" onClick={() => openEditModal(event._id)}>
                Edit
              </Button>
              <Button danger onClick={() => handleDelete(event._id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <EditEventModal
        visible={showModal}
        eventId={editingEventId}
        onClose={closeEditModal}
        onSuccess={fetchMyEvents}
      />
    </div>
  );
};

export default MyEvents;
