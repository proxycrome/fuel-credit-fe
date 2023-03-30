import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import FuelCreditLogo from "../../assets/images/FuelCreditLogo.svg";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false)
  const navigate = useNavigate();

  const handleClick = () => {
    setShowNav(!showNav)
  };

  return (
    <div className={styles.Nav}>
      <div className={styles.Navbar}>
        <div className={styles.NavLeft}>
          <div className={styles.logo}>
            <img src={FuelCreditLogo} alt="Business Logo" />
          </div>
          <div className={`${styles.LeftNavItems} ${showNav ? styles.responsive : '' }`}>
            <div className={styles.link}>
              <Link to="#">Individuals/Corporates</Link>
            </div>
            <div className={styles.link}>
              <Link to="#">Merchants</Link>
            </div>
          </div>
        </div>
        <div className={`${styles.NavRight} ${showNav ? styles.responsive: '' }`}>
          <div className={styles.link}>
            <Link to="#">About Us</Link>
          </div>
          <div className={styles.link}>
            <Link to="#">FAQs</Link>
          </div>
          <div className={styles.NavButtons}>
            <button
              className={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className={styles.signupBtn}
              onClick={() => navigate("/individual-form")}
            >
              Create free account
            </button>
          </div>
        </div>
      </div>
      <div className={styles.hamburger} onClick={handleClick}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default Navbar;
