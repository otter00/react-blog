import "./LoginPageStyles.scss";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { useState } from "react";

export const LoginPage = ({
  isLoggedIn,
  setIsLoggedIn,
  setUserName,
  setIsOwner,
}) => {
  let navigate = useNavigate();
  // console.log(isLoggedIn);

  const [logIn, setLogIn] = useState("");
  const [password, setPassword] = useState("");

  const handleLogInChange = (e) => {
    setLogIn(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (logIn === "Anastasia Ivleva") {
      if (password === "12345") setIsOwner(true);
      else {
        alert("wrong");
        return false;
      }
    }

    if (localStorage.getItem(`${logIn + password}`)) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userName", logIn);

      setUserName(logIn);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("wrong input, try again");
    }
  };

  return (
    <h1>
      <form className="login__form" onSubmit={handleLogin}>
        <h2>Авторизация</h2>
        <div>
          <input
            autoComplete="off"
            type="text"
            className="login-form__input"
            placeholder="Enter your name"
            name="formLogin"
            onChange={handleLogInChange}
            required
          />
        </div>

        <div>
          <input
            autoComplete="off"
            type="password"
            className="login-form__input"
            placeholder="Enter your password"
            name="formPassword"
            onChange={handlePasswordChange}
            required
          />
        </div>

        <CustomButton className={"CustomButtonStyle"} name={"Войти"} />
      </form>

      <span className="sign-up__link">
        Not a member yet? <a href="/signup"> Sign Up</a>
      </span>
    </h1>
  );
};
