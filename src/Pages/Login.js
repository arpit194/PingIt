import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { useRequest } from "../hooks/requestHook";
import Spinner from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { loading, sendPostRequest } = useRequest();

  const [values, setValues] = useState({
    email: "",
    password: "",
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
      const { password, email } = values;
      const data = await sendPostRequest(loginRoute, {
        email,
        password,
      });

      if (!data.status) {
        toast.error(data.message, toastOptions);
      }
      if (data.status) {
        toast.success("Welcome " + data.user.userName, {
          ...toastOptions,
          autoClose: 2000,
        });
        dispatch(authActions.login({ user: data.user, token: data.token }));
        setTimeout(() => {
          navigate("/setAvatar");
        }, 2000);
      }
    }
  };

  // Handle input validation
  const handleValidation = () => {
    const { password, email } = values;
    if (email.length === 0) {
      toast.error("Email or username is required", toastOptions);
      return false;
    } else if (password.length < 7) {
      toast.error(
        "Password should be greater than 6 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  return (
    <>
      <div className={classes.loginContainer}>
        <div className={classes.signupCard}>
          <div className={classes.header}>Login</div>
          <input
            className={classes.input}
            name="email"
            type="email"
            placeholder="Enter email or username"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={(ev) => handleChange(ev)}
          />
          <div className={classes.button} onClick={handleSubmit}>
            {loading ? <Spinner fontSize="1.5vw" /> : "LOGIN"}
          </div>
          <div className={classes.questionContainer}>
            <div className={classes.question}>Don't have an account?</div>
            <div className={classes.change}>
              <Link to="/register">Signup</Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
