import { Link } from "react-router-dom";
import FuelCreditLogo from "../../assets/images/FuelCreditLogo.svg";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div>
      <aside>
        <div className={styles.logo}>
          <img src={FuelCreditLogo} alt="Business Logo" />
        </div>
        <div>
          <ul>
            <li>
              <Link to="/dashboard" className={styles.active}>
                <i className={`fa fa-home ${styles.icon}`}></i>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className={`fa fa-briefcase ${styles.icon}`}></i>
                <span>Wallet</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className={`fa fa-money ${styles.icon}`}></i>
                <span>Credit</span>
              </Link>
            </li>
            <li>
              <Link to="#" style={{display: "flex", alignItems: "center"}}>
                <i className={`fa fa-user-plus ${styles.icon}`}></i>
                <span>Beneficiaries</span>
              </Link>
            </li>
            <li>
              <Link to="#" style={{display: "flex", alignItems: "center"}}>
                <i className={`fa fa-map-marker ${styles.icon}`}></i>
                <span>Filling Stations</span>
              </Link>
            </li>
            <hr style={{width: "90%"}}/>
            <li>
              <Link to="#" style={{display: "flex", alignItems: "center"}}>
                <i className={`fa fa-envelope-o ${styles.icon}`}></i>
                <span>Customer Support</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
