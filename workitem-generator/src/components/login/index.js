import { Form, Input, Button } from "antd";
import React from "react";
import styles from "./Login.module.css";
import Image from "next/image";

const Login = () => {
  return (
    <div className={styles.registerContainer}>
      {/* <h1 className={styles.LoginTitle}>Login </h1> */}

      <Form autoComplete="off" labelCol={{ span: 10 }} wrapperCol={{ span: 5 }}>
        {/* Email Address */}
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter your email address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your Email" />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
            { min: 4 },
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Password does not match."),
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your Password" />
        </Form.Item>

        {/* button */}
        <Form.Item
          wrapperCol={{ span: 50 }}
          className={styles.signInBtnContainer}
        >
          <Button
            block
            type="primary"
            htmlType="submit"
            className={styles.signInBtn}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
