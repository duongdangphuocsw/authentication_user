import React, { useState } from "react";
import "./login.scss";
import { login } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log(response);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response
        })
        navigate('/profile')
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <>
      <form className="form__container">
        <h1 className="form__header">Login</h1>
        <div className="form__group">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            placeholder="example@kyanon.digital"
            onChange={handleChangeEmail}
            value={email}
          ></input>
        </div>
        <div className="form__group">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            placeholder="******"
            onChange={handleChangePassword}
            value={password}
            type={isShowPassword ? "text" : "password"}
          />
        </div>
        <div className="form__footer">
          <label>
            <input
              type="checkbox"
              name="showPassword"
              onClick={handleShowPassword}
            />
            Show password
          </label>
          <button onClick={handleLogin}>Sign in</button>
        </div>
      </form>
    </>
  );
};

export default Login;
