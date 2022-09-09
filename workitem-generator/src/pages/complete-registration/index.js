import { Form, Input, Image, Button } from "antd";
import React from "react";
import styles from "./Styles.module.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

const CompleteRegistration = () => {
  return (
    <div className={styles.completeRegistrationContainer}>
      <div className={styles.imgContainer}>
        <Image
          src="/images/b_logo.png"
          width="150px"
          height="150px"
          className={styles.headerLogo}
        />
      </div>
      <h1 className={styles.LoginTitle}>Complete Registration </h1>
      <Form labelCol={{ span: 10 }} wrapperCol={{ span: 6 }}>
        {/* 4.Devops Username */}

        <Form.Item
          label="Devops Username"
          name="devOpsUsername"
          rules={[
            {
              required: true,
              message: "Please enter your devops username",
            },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
          tooltip={{
            title:
              "Go to Azure DevOps account manager icon and click on view account to get access of your username, which should be your name and surname.",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Enter your devOps username" />
        </Form.Item>

        {/* 5.Pat*/}

        <Form.Item
          label="Devops Pat"
          name="pat"
          rules={[
            {
              required: true,
              message: "Please enter your personal access token(pat)",
            },
            { whitespace: true },
            { min: 17 },
            { max: 17 },
          ]}
          hasFeedback
          tooltip={{
            title:
              "Generate your PAT token, to connect to DevOps by going to Azure DevOps and clicking on the user setting icon and then clicking on personal access tokens to generate the token.Note that your token expires after some time, therefore you must regenerate a new token when that happens. ",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Enter your devOps personal access token(pat)" />
        </Form.Item>

        {/* 6.Airtable API Key*/}

        <Form.Item
          label="Airtable API Key"
          name="airtableApiKey"
          rules={[
            {
              required: true,
              message: "Please enter your airtable api key",
            },
            { whitespace: true },
            { min: 17 },
            { max: 17 },
          ]}
          hasFeedback
          tooltip="This is your personal API key. It’s required to use the Airtable API. Therefore, click on the user Icon and then on Account, copy the provided API key and paste it here."
        >
          <Input placeholder="Enter your airtable api key" />
        </Form.Item>

        {/* Button */}
        <Form.Item
          wrapperCol={{ span: 50 }}
          className={styles.signUpBtnContainer}
        >
          <Link href="/login">
            <Button
              block
              type="primary"
              htmlType="submit"
              className={styles.signUpBtn}
            >
              Sign In
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CompleteRegistration;
