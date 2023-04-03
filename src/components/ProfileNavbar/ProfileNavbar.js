import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileNavbar.module.css";

const ProfileNavbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    setShow(!show);
  };

  // const handleChangeLeave = () => {
  //   setTimeout(() => {
  //       setShow(false);
  //   }, 5000)
    
  // };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.NavWrapper}>
      <div>
        <h2>Home</h2>
      </div>
      <div className={styles.icons} onClick={handleChange}>
        <i
          className={`fa fa-user-circle-o ${styles.user}`}
          aria-hidden="true"
        ></i>
        <i
          className={`fa fa-chevron-down ${styles.caret}`}
          aria-hidden="true"
        ></i>
      </div>
      <div
        className={`${styles.dropdown} ${show ? styles.show : ""}`}
      >
        <div className={styles.profile}>
          <i
            className={`fa fa-user-circle-o ${styles.user}`}
            aria-hidden="true"
          ></i>{" "}
          <span>My Profile</span>
        </div>
        <div className={styles.logout} onClick={logout}>
          <i
            className={`fa fa-sign-out ${styles.logoutIcon}`}
            aria-hidden="true"
          ></i>{" "}
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavbar;
