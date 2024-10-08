import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { Form, Input, Button } from "antd"; // Ant Design components
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Swal from "sweetalert";

const Signup = () => {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    const { username, email, password } = values;

    try {
      const response = await axios.post("http://localhost:3001/addeduser", { username, email, password });
      
      if (response.data.msg === "201") {
        Swal.fire({
          title: "Success",
          text: "User registered successfully!",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          navigate("/home");
        });
      } else if (response.data.msg === "Utilisateur existe") {
        Swal.fire({
          title: "Error",
          text: "User already exists with this email.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Signup Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Sign Up</h2>
      <Form
        name="signup"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
