// import { useState } from "react";
// import { Form, Input, Button, Card, Alert, Typography } from "antd";
// import { UserOutlined, LockOutlined, MailOutlined, CameraOutlined } from "@ant-design/icons";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";


// const { Title } = Typography;

// export default function Register() {
//   const [form] = Form.useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async (values) => {
//     setLoading(true);
//     setError("");
    
//     try {
//       const res = await api.post("/auth/register", {
//         name: values.name,
//         email: values.email,
//         password: values.password,
//         photoURL: values.photoURL
//       });

//       if(res.data.token) {
       
//         navigate("/login");
//       }
      
     
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ 
//       minHeight: '100vh', 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'center',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//     }}>
//       <Card
//         style={{
//           width: 420,
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//           borderRadius: '8px'
//         }}
//       >
//         <div style={{ textAlign: 'center', marginBottom: 24 }}>
//           <Title level={2} style={{ color: '#1890ff', marginBottom: 8 }}>
//             Create Account
//           </Title>
//           <p style={{ color: '#666', margin: 0 }}>
//             Join us and start managing events
//           </p>
//         </div>

//         {error && (
//           <Alert
//             message={error}
//             type="error"
//             showIcon
//             closable
//             onClose={() => setError("")}
//             style={{ marginBottom: 16 }}
//           />
//         )}

//         <Form
//           form={form}
//           name="register"
//           onFinish={handleRegister}
//           layout="vertical"
//           size="large"
//           initialValues={{
//             photoURL: "https://i.pravatar.cc/150?img=1"
//           }}
//         >
//           <Form.Item
//             name="name"
//             label="Full Name"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your full name!',
//               },
//               {
//                 min: 2,
//                 message: 'Name must be at least 2 characters long!',
//               },
//             ]}
//           >
//             <Input
//               prefix={<UserOutlined />}
//               placeholder="Enter your full name"
//               autoComplete="name"
//             />
//           </Form.Item>

//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your email!',
//               },
//               {
//                 type: 'email',
//                 message: 'Please enter a valid email!',
//               },
//             ]}
//           >
//             <Input
//               prefix={<MailOutlined />}
//               placeholder="Enter your email"
//               autoComplete="email"
//             />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your password!',
//               },
//               {
//                 min: 6,
//                 message: 'Password must be at least 6 characters long!',
//               },
//             ]}
//           >
//             <Input.Password
//               prefix={<LockOutlined />}
//               placeholder="Enter your password"
//               autoComplete="new-password"
//             />
//           </Form.Item>

//           <Form.Item
//             name="confirmPassword"
//             label="Confirm Password"
//             dependencies={['password']}
//             rules={[
//               {
//                 required: true,
//                 message: 'Please confirm your password!',
//               },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue('password') === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(new Error('Passwords do not match!'));
//                 },
//               }),
//             ]}
//           >
//             <Input.Password
//               prefix={<LockOutlined />}
//               placeholder="Confirm your password"
//               autoComplete="new-password"
//             />
//           </Form.Item>

//           <Form.Item
//             name="photoURL"
//             label="Photo URL (Optional)"
//             rules={[
//               {
//                 type: 'url',
//                 message: 'Please enter a valid URL!',
//               },
//             ]}
//           >
//             <Input
//               prefix={<CameraOutlined />}
//               placeholder="Enter photo URL"
//             />
//           </Form.Item>

//           <Form.Item style={{ marginBottom: 0 }}>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={loading}
//               style={{
//                 width: '100%',
//                 height: '40px',
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 border: 'none',
//                 borderRadius: '6px'
//               }}
//             >
//               {loading ? 'Creating Account...' : 'Create Account'}
//             </Button>
//           </Form.Item>
//         </Form>

//         <div style={{ textAlign: 'center', marginTop: 16 }}>
//           <p style={{ color: '#666', margin: 0 }}>
//             Already have an account? <a href="/login" style={{ color: '#1890ff' }}>Sign In</a>
//           </p>
//         </div>
//       </Card>
      
//     </div>
//   );
// }






import { useState } from "react";
import { Form, Input, Button, Card, Alert, Typography, Modal } from "antd"; // Import Modal
import { UserOutlined, LockOutlined, MailOutlined, CameraOutlined, CheckCircleOutlined } from "@ant-design/icons"; // Import CheckCircleOutlined for the modal icon
import api from "../services/api"; 
const { Title } = Typography;

export default function Register() {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // State for modal visibility

 

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    
  };


  const handleRegister = async (values) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        photoURL: values.photoURL,
      });

      if (res.data.token) {
        // Show success modal instead of navigating directly
        setIsSuccessModalVisible(true);
        // Do NOT navigate here directly: navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = () => {
    setIsSuccessModalVisible(false);
    navigate("/login"); // Navigate to login after modal is closed
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: 'Inter, sans-serif' 
      }}
    >
      <Card
        style={{
          width: 420,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ color: "#1890ff", marginBottom: 8 }}>
            Create Account
          </Title>
          <p style={{ color: "#666", margin: 0 }}>
            Join us and start managing events
          </p>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError("")}
            style={{ marginBottom: 16, borderRadius: '4px' }}
          />
        )}

        <Form
          form={form}
          name="register"
          onFinish={handleRegister}
          layout="vertical"
          size="large"
          initialValues={{
            photoURL: "https://i.pravatar.cc/150?img=1",
          }}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
              {
                min: 2,
                message: "Name must be at least 2 characters long!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
              autoComplete="name"
              style={{ borderRadius: '4px' }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              autoComplete="email"
              style={{ borderRadius: '4px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              autoComplete="new-password"
              style={{ borderRadius: '4px' }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
              autoComplete="new-password"
              style={{ borderRadius: '4px' }}
            />
          </Form.Item>

          <Form.Item
            name="photoURL"
            label="Photo URL (Optional)"
            rules={[
              {
                type: "url",
                message: "Please enter a valid URL!",
              },
            ]}
          >
            <Input
              prefix={<CameraOutlined />}
              placeholder="Enter photo URL"
              style={{ borderRadius: '4px' }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: "100%",
                height: "40px",
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "6px",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <p style={{ color: "#666", margin: 0 }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#1890ff" }}>
              Sign In
            </a>
          </p>
        </div>
      </Card>

      {/* Success Modal */}
      <Modal
        title={
          <span style={{ color: "#52c41a", display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutlined style={{ marginRight: 8 }} /> Registration Successful!
          </span>
        }
        visible={isSuccessModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsSuccessModalVisible(false)}
        footer={[
          <Button key="login" type="primary" onClick={handleModalOk} style={{ borderRadius: '6px' }}>
            Go to Login
          </Button>,
        ]}
        centered
        maskClosable={false} 
      >
        <p>Your account has been successfully created. You can now log in.</p>
      </Modal>
    </div>
  );
}
