import { useEffect, useState } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useRegisterUserMutation } from "../../services/userApi";
import SignupIcon from "../../components/SignupIcon/SignupIcon";
import styles from "./Signup.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../../components/Navbar/Navbar";

const options = [
  { value: "", label: "Select your category" },
  { value: "Others", label: "Others" },
  // { value: "Bike - Gokada", label: "Bike - Gokada" },
  // { value: "Bike - Kwik", label: "Bike - Kwik" },
  // { value: "Bike - Max", label: "Bike - Max" },
  // { value: "Bike - Other", label: "Bike - Other" },
  // { value: "Taxi - Bolt", label: "Bike - Bolt" },
  // { value: "Taxi - Uber", label: "Bike - Uber" },
  // { value: "Salary Earners", label: "Salary Earners" },
];

const Signup = () => {
  const data = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    category: "",
    password: "",
    cpassword: "",
    nin: "",
    email: "",
  };
  const [formData, setFormData] = useState(data);
  const [selectedOption, setSelectedOption] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [registerUser, response] = useRegisterUserMutation();
  const navigate = useNavigate();

  const togglePassword1 = () => {
    setPasswordShown(!passwordShown);
  };

  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, mobileNumber, password, cpassword } = formData;


    if (password !== cpassword) {
      alert("Ensure passwrod and confirm password are the same.");
      return;
    }

    const data = {
      firstName,
      lastName,
      mobileNumber,
      category: selectedOption.value,
      password,
    };
    await registerUser(data);
  };

  useEffect(() => {
    if(response.isError){
      alert('Something went wrong, Try again')
    }
    if (response.isSuccess) {
      toast.success('Registration Created Successfully', {position: "top-right"})
      navigate("/login");
    }
  }, [response, navigate]);

  return (
    <>
      <Navbar />
      <Toaster/>
      <div className={styles.SignupWrapper}>
        <div className={styles.FormBox}>
          <div className={styles.header}>
            <SignupIcon />
            <h1>Individual/Family</h1>
          </div>
          <div className={styles.accountType}>
            <p>
              Not an Individual? <Link to="#">Choose another account type</Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber">Phone Number</label>
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
              <label htmlFor="category">Category</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="NIN">NIN (Optional)</label>
              <input
                type="text"
                id="NIN"
                placeholder="Enter NIN"
                name="nin"
                value={formData.nin}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email (Optional)</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pass" style={{ display: "block" }}>
                Password
              </label>
              <div className="input-group">
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  style={{ width: "400px" }}
                  id="pass"
                  onChange={handleChange}
                  value={formData.password}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$"
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
            <div className={styles.formGroup}>
              <label htmlFor="cpass" style={{ display: "block" }}>
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={passwordShown2 ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="cpassword"
                  style={{ width: "400px" }}
                  id="cpass"
                  onChange={handleChange}
                  value={formData.cpassword}
                />
                <div className="input-group-text">
                  <i
                    onClick={togglePassword2}
                    style={{ cursor: "pointer" }}
                    className={
                      passwordShown2 ? "far fa-eye" : "far fa-eye-slash"
                    }
                  ></i>
                </div>
              </div>
            </div>
            <div className={styles.policy}>
              <p>
                By creating an account you agree to our{" "}
                <Link to="#">Terms of Use</Link> <br />
                and <Link to="#">Privacy policy</Link>
              </p>
            </div>
            <button type="submit" className={styles.signupBtn} disabled={response.isLoading}>
              {response.isLoading ? "Loading..." :"Create my account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
