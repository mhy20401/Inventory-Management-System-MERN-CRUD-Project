import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button } from "antd"; // Ant Design components
import { MailOutlined, LockOutlined } from "@ant-design/icons"; // Ant Design Icons
import { toast } from "react-toastify";

const Login = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    const { email, password } = values;
    setLoading(true); // Set loading when form submission starts

    try {
      const response = await axios.post("http://localhost:3001/login", { email, password });

      // Save the auth token
      localStorage.setItem("authToken", response.data.token);

      // Update login state
      setIsLoggedIn(true);

      // Show success toast
      toast.success("Logged in successfully!");

      // Navigate to products page
      navigate("/products");
    } catch (error) {
      console.error(error);
      // Show error toast
      toast.error("Login failed! Please check your credentials.");
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <Form
        name="login"
        onFinish={submitHandler}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Enter email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
