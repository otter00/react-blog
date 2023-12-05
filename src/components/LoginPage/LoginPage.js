import "./LoginPageStyles.scss";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { useState } from "react";

export const LoginPage = ({ isLoggedIn, setIsLoggedIn, setUserName }) => {
  let navigate = useNavigate();
  console.log(isLoggedIn);

  const [logIn, setLogIn] = useState("");
  const [passwrd, setPassword] = useState("");

  const handleLogInChange = (e) => {
    setLogIn(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userName", logIn);

    setUserName(logIn);
    //console.log("hello");
    setIsLoggedIn(true);
    navigate("/");
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
            placeholder="Login"
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
            placeholder="Password"
            name="formPassword"
            onChange={handlePasswordChange}
            required
          />
        </div>

        <CustomButton className={"CustomButtonStyle"} name={"Войти"} />
      </form>
    </h1>
  );
};
