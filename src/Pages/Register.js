import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { useSelector } from "react-redux";
import { useRequest } from "../hooks/requestHook";
import Spinner from "../components/Spinner";

const Register = () => {
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const { loading, sendPostRequest } = useRequest();

  const [values, setValues] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Redirection
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  // Handle Input change
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (handleValidation()) {
      const { password, email, name, userName } = values;
      const data = await sendPostRequest(registerRoute, {
        userName,
        name,
        email,
        password,
      });

      if (!data.status) {
        toast.error(data.message, toastOptions);
      }
      if (data.status) {
        toast.success("Account created for " + data.user.userName, {
          ...toastOptions,
          autoClose: 2000,
        });
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        localStorage.setItem("chat-app-user-token", JSON.stringify(data.token));

        setTimeout(() => {
          navigate("/setAvatar");
        }, 2000);
      }
    }
  };

  // Validation of inputs
  const handleValidation = () => {
    const { password, confirmPassword, email, name, userName } = values;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", toastOptions);
      return false;
    } else if (userName.length < 4 || userName.length > 10) {
      toast.error(
        "User name should be greater than 4 characters and less than 10 characters.",
        toastOptions
      );
      return false;
    } else if (!userName.match(/^[A-Za-z0-9]+$/)) {
      toast.error(
        "User name can only contain letters and numbers",
        toastOptions
      );
      return false;
    } else if (name.length < 5) {
      toast.error("Name should be greater than 4 characters.", toastOptions);
      return false;
    } else if (password.length < 7) {
      toast.error(
        "Password should be greater than 6 characters.",
        toastOptions
      );
      return false;
    } else if (!email.includes("@") || !email.includes(".")) {
      toast.error("Enter email in correct format.", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className={classes.loginContainer}>
        <div className={classes.signupCard}>
          <div className={classes.header}>Signup</div>
          <input
            className={classes.input}
            name="userName"
            type="text"
            placeholder="Enter User Name"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={(ev) => handleChange(ev)}
          />
          <div className={classes.button} onClick={handleSubmit}>
            {loading ? <Spinner fontSize="1.5vw" /> : "SIGNUP"}
          </div>
          <div className={classes.questionContainer}>
            <div className={classes.question}>Already have an account?</div>
            <div className={classes.change}>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
