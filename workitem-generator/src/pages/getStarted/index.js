import React, { useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "./GetStarted.module.css";
import Link from "next/link";
import SignInUp from "../../components/signInUp";

const GetStarted = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Header />
      {/* <Link href="/login"> */}

      {/* </Link> */}

      {/* <div>
        <p>
          'Don't have an account yet? <br />
        </p>
      </div> */}

      <div className={styles.action}>
        <input
          type="submit"
          value="Get Started"
          className={styles.actionDownloadBtn}
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        />
      </div>
      <Footer />

      {showModal && (
        <SignInUp showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default GetStarted;
