import { Form, Input, Button } from "antd";
import styles from "./Register.module.css";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  return (
    <div className={styles.registerContainer}>
      {/* <h1 className={styles.RegisterTitle}>Create your account</h1> */}

      <Form
        autoComplete="off"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 5 }}
        className={styles.FormContainer}
      >
        {/* 1.Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        {/* 2.Surname */}
        <Form.Item
          label="Surname"
          name="surname"
          rules={[
            {
              required: true,
              message: "Please enter your surname",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your surname" />
        </Form.Item>

        {/* 3.Email Address */}

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
            { type: "email", message: "Please enter a valid email" },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        {/* 6.Password */}

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
            },
            { min: 4 },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your password" />
        </Form.Item>

        {/* 7.Comfirm Password */}
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered does not match."
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        {/* Button */}
        <Form.Item
          wrapperCol={{ span: 50 }}
          className={styles.signUpBtnContainer}
        >
          <Link href="/complete-registration">
            <Button
              block
              type="primary"
              htmlType="submit"
              className={styles.signUpBtn}
            >
              Next
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
