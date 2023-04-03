import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import { Toaster } from "react-hot-toast";
import { useGetUserDetailsQuery } from "../../services/userApi";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const id = JSON.parse(localStorage.getItem("data"))?.id;

  const { isLoading, isError, currentData, status } =
    useGetUserDetailsQuery(parseInt(id));

  useEffect(() => {
    if (status === "rejected") {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, [status]);

  return (
    <>
      {isLoading && status === "pending" && isError ? (
        <div style={{ width: "100%", margin: "0 auto" }}>
          <h4>Loading...</h4>
        </div>
      ) : status === "fulfilled" ? (
        <div className={styles.dashWrapper}>
          <div>
            <Sidebar />
          </div>
          {isLoading && status === "pending" ? (
            <div style={{ width: "100%", margin: "0 auto" }}>
              <h4>Loading...</h4>
            </div>
          ) : (
            <div>
              <ProfileNavbar />
              <Toaster />
              <div className={styles.pageContent}>
                <div className={styles.cardSection}>
                  <div className={styles.card}>
                    <i className={`fa fa-lightbulb-o ${styles.fuelIcon}`}></i>
                    <div className={styles.details}>
                      <p style={{ display: "inline" }}>Fuel Purchases</p>
                      <span>{currentData?.count_fuel}</span>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <i
                      className={`fa fa-money ${styles.fuelIcon}`}
                      style={{ color: "#4FB518" }}
                    ></i>
                    <div className={styles.details}>
                      <p style={{ display: "inline" }}>Total Purchases</p>
                      <span>₦{currentData?.total_fuel}</span>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <i
                      className={`fa fa-user-plus ${styles.fuelIcon}`}
                      style={{ color: "#0000FF" }}
                    ></i>
                    <div className={styles.details}>
                      <p style={{ display: "inline" }}>Beneficiaries</p>
                      <span>{currentData?.beneficiary}</span>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <i
                      className={`fa fa-map-marker ${styles.fuelIcon}`}
                      style={{ color: "#31581C" }}
                    ></i>
                    <div className={styles.details}>
                      <p style={{ display: "inline" }}>Filling Stations</p>
                      <span>{currentData?.filling_station_count}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.otherSection}>
                  <div className={styles.walletSection}>
                    <div className={styles.header}>
                      <h5>Wallet</h5>
                      <Link to="#">See details</Link>
                    </div>
                    <div className={styles.walletCard}>
                      <div className={styles.cardContentTop}>
                        <div className={styles.details}>
                          <h6>Wallet Balance</h6>
                          <span>₦{currentData?.balance}</span>
                        </div>
                        <Link to="#">Fund Wallet</Link>
                      </div>
                      <hr />
                      <div className={styles.cardContentBottom}>
                        <div className={styles.details}>
                          <h5>Recent Transaction</h5>
                          <p>No recent fuel purchases</p>
                        </div>
                        <Link to="#">See all</Link>
                      </div>
                    </div>
                  </div>
                  <div className={styles.creditSection}>
                    <div className={styles.header}>
                      <h5>Credit</h5>
                      <Link to="#">See details</Link>
                    </div>
                    <div className={styles.creditCard}>
                      <h4>Buy now. pay later with FuelCredit</h4>
                      <Link>Request Credit</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: "100%", margin: "0 auto" }}>
          <h4>Loading...</h4>
        </div>
      )}
    </>
  );
};

export default Dashboard;
