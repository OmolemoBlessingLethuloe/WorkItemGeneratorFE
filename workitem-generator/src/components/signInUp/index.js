import { Image, Modal } from "antd";
import React, { useState } from "react";
import styles from "./Styles.module.css";
import { Tabs } from "antd";
import Login from "../login";
import Register from "../register";

const onChange = (key) => {
  console.log(key);
};

const SignInUp = ({ showModal, setShowModal }) => {
  return (
    <Modal
      centered
      open={showModal}
      onCancel={() => setShowModal(false)}
      width={1000}
      footer={null}
    >
      <div className={styles.imgContainer}>
        <Image
          src="/images/b_logo.png"
          width="60px"
          height="60px"
          className={styles.headerLogo}
        />
      </div>
      <Tabs
        defaultActiveKey="1"
        centered
        onChange={onChange}
        items={[
          {
            label: `Sign In`,
            key: "1",
            children: <Login />,
          },
          {
            label: `Sign Up`,
            key: "2",
            children: <Register />,
          },
        ]}
      />
    </Modal>
  );
};

export default SignInUp;
