// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Button, Card, Typography, Spin, Empty, Avatar, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import dayjs from 'dayjs';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  StarFilled,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUpcomingEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/events/public');
      setEvents(res.data || []);
    } catch (error) {
      console.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Hero Section */}
      <section className="text-center py-20 bg-white rounded-2xl shadow-lg mb-10">
        <Title level={1} className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
          Organize. Explore. Experience.
        </Title>
        <Text className="text-xl text-gray-600">
          Discover events that inspire you. Host events that unite people.
        </Text>
        <div className="mt-6">
          <Button
            type="primary"
            size="large"
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => navigate('/events')}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Promotion/Highlights */}
      <section className="text-center mb-16">
        <Title level={2} className="text-indigo-600">Why Choose Eventify?</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <Card className="shadow-lg border-t-4 border-indigo-500">
            <Title level={4}>Effortless Event Creation</Title>
            <Paragraph>Organize events in minutes with our intuitive platform.</Paragraph>
          </Card>
          <Card className="shadow-lg border-t-4 border-indigo-500">
            <Title level={4}>Discover Local Events</Title>
            <Paragraph>Find trending events happening around you with real-time updates.</Paragraph>
          </Card>
          <Card className="shadow-lg border-t-4 border-indigo-500">
            <Title level={4}>Seamless Participation</Title>
            <Paragraph>Stay informed, RSVP easily, and never miss an event again.</Paragraph>
          </Card>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-20">
        <Title level={2} className="text-center text-indigo-600 mb-8">
          Upcoming Events
        </Title>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : events.length === 0 ? (
          <Empty description="No events found" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card
                key={event._id}
                hoverable
                className="shadow-md transition-all duration-300 hover:scale-105 bg-white border-l-4 border-indigo-500"
                title={<span className="text-indigo-700">{event.title}</span>}
              >
                <p><UserOutlined className="mr-2" /> <strong>Host:</strong> {event.hostName}</p>
                <p><CalendarOutlined className="mr-2" /> <strong>Date:</strong> {dayjs(event.dateTime).format('MMMM D, YYYY h:mm A')}</p>
                <p><EnvironmentOutlined className="mr-2" /> <strong>Location:</strong> {event.location}</p>
                <p className="truncate"><strong>Description:</strong> {event.description}</p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="text-center py-16 bg-white rounded-2xl shadow-lg">
        <Title level={2} className="text-indigo-600">What Our Users Say</Title>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Ahmed",
              feedback: "I loved how easy it was to manage my event. Highly recommend this platform!",
              rating: 5
            },
            {
              name: "Tariq Hossain",
              feedback: "As an attendee, I discovered some amazing local meetups here!",
              rating: 4
            },
            {
              name: "Lina Chowdhury",
              feedback: "Simple, effective, and beautiful UI. Everything just works!",
              rating: 5
            }
          ].map((review, i) => (
            <Card key={i} bordered={false} className="shadow-md text-left">
              <div className="flex items-center mb-4">
                <Avatar icon={<UserOutlined />} className="mr-3" />
                <div>
                  <Text strong>{review.name}</Text>
                  <br />
                  <Rate disabled defaultValue={review.rating} />
                </div>
              </div>
              <Paragraph>"{review.feedback}"</Paragraph>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
