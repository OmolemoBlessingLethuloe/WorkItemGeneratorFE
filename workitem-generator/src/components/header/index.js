import styles from "./Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.imgContainer}>
        <Image
          src="/images/app_logo.png"
          width={800}
          height={200}
          className={styles.headerLogo}
          alt="boxfusion Logo"
        />
      </div>

      <h1 className={styles.header__title}>DevOps WorkItems</h1>
      <p className={styles.header__sub_title}>
        Generate workitems for any project in less than a minute.
      </p>
    </div>
  );
};

export default Header;
