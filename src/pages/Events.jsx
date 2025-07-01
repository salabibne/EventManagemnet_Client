import React, { useEffect, useState } from 'react';
import { Input, Card, Button, message } from 'antd';
import {
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import api from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');

  const fetchEvents = async (searchTerm = '') => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = searchTerm
        ? `/events/search?search=${encodeURIComponent(searchTerm)}`
        : `/events`;

      const res = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data);
    } catch (err) {
      message.error('Failed to fetch events');
    }
  };

  const handleJoin = async (id) => {
    try {
      await api.post(
        `/events/join/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      message.success('Joined event');
      fetchEvents(search);
    } catch (err) {
      message.error(err?.response?.data?.message || 'Already joined or failed to join');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">All Events</h2>

      <Input.Search
        placeholder="Search by title"
        enterButton
        allowClear
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={(value) => fetchEvents(value)}
        className="mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <Card key={event._id} title={event.title}>
            <p>
              <UserOutlined className="mr-2" />
              <strong>Host:</strong> {event.hostName}
            </p>
            <p>
              <CalendarOutlined className="mr-2" />
              <strong>Date:</strong>{' '}
              {dayjs(event.dateTime).format('MMM DD, YYYY hh:mm A')}
            </p>
            <p>
              <EnvironmentOutlined className="mr-2" />
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <UserOutlined className="mr-2" />
              <strong>Attendees:</strong> {event.attendeeCount || 0}
            </p>
            <Button type="primary" onClick={() => handleJoin(event._id)} size="small">
              Join
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
