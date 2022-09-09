import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>
        Workitems generator is made with ❤️ by{" "}
        <a href="https://boxfusion.co.za/">Boxfusion</a>
      </p>
    </div>
  );
};

export default Footer;
