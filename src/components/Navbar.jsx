import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Button } from "antd";
import { UserOutlined, LogoutOutlined, PlusOutlined, CalendarOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <div className="py-1">
          <div className="font-medium">{user?.name}</div>
          <div className="text-gray-500 text-sm">{user?.email}</div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
            Eventify
          </Link>

          {/* Navigation Links & User Menu */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            
            {user && (
              <>
                <Link to="/events" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <CalendarOutlined className="text-sm" />
                  Events
                </Link>
                <Link to="/add-event" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <PlusOutlined className="text-sm" />
                  Add Event
                </Link>
                <Link to="/my-events" className="text-gray-700 hover:text-blue-600 transition-colors">
                  My Events
                </Link>
              </>
            )}

            {/* Auth Section */}
            {!user ? (
              <Button type="primary" size="small">
                <Link to="/login" className="text-white">Sign In</Link>
              </Button>
            ) : (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
              >
                <Avatar
                  src={user.photoURL}
                  icon={<UserOutlined />}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  size="default"
                />
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;