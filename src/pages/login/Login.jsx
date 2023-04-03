import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LoginIcon from "../../components/LoginIcon/LoginIcon";
import styles from "./Login.module.css";
import { useLoginUserMutation } from "../../services/userApi";
import Navbar from "../../components/Navbar/Navbar";


const Login = () => {
  const data = {
    mobileNumber: "",
    password: "",
  };
  const [formData, setFormData] = useState(data);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginUser, response] = useLoginUserMutation();
  const navigate = useNavigate();

  const togglePassword1 = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await loginUser(formData);
  };

  useEffect(() => {
    if(response.isError){
      alert('Something went wrong, Try again')
    }
    if(response.isSuccess){
      toast.success('Login Successfully', {position: 'top-right'})
      localStorage.setItem("data", JSON.stringify(response.data))
      navigate("/dashboard")
    }
  }, [response, navigate])

  return (
    <>
      <Navbar />
      <Toaster/>
      <div className={styles.SignupWrapper}>
        <div className={styles.FormBox}>
          <div className={styles.header}>
            <LoginIcon />
            <h1>Individual Login</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber">Phone Number(User ID)</label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Enter 11-digit phone number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.label}>
                <label htmlFor="pass">
                  Password
                </label>
                <Link to="#">Forget password</Link>
              </div>
              
              <div className="input-group">
                <input
                  type={passwordShown ? "text" : "password" }
                  placeholder="Enter Password"
                  name="password"
                  id="pass"
                  onChange={handleChange}
                  value={formData.password}
                />
                <div className="input-group-text">
                  <i
                    onClick={togglePassword1}
                    style={{ cursor: "pointer" }}
                    className={
                      passwordShown ? "far fa-eye" : "far fa-eye-slash"
                    }
                  ></i>
                </div>
              </div>
            </div>
            <button type="submit" className={styles.signupBtn} disabled={response.isLoading}>
              {response.isLoading ? "Loading..." : 'Log in'}
            </button>
          </form>
          <div className={styles.policy}>
            <p>
              New User? <Link to="/individual-form">Create account</Link> <br />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
