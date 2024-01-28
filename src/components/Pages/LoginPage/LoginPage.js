import "./LoginPageStyles.scss";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../../UI/CustomButton/CustomButton";
import { useState } from "react";
import { customHash } from "../../../utils/getHash";

export const LoginPage = ({
  isLoggedIn,
  setIsLoggedIn,
  setUserName,
  setIsOwner,
  setIsNewUser,
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

    const inputString = password;
    const hashedPass = customHash(inputString);

    // проверка имени владельца
    if (logIn === "Anastasia Ivleva") {
      // проверка на совпадение имя+хэш пароля с парой имя+хэш из локального хранилища
      if (
        logIn + customHash(password) ===
        localStorage.getItem(`${logIn + hashedPass}`)
      )
        setIsOwner(true);
      else {
        alert("wrong");
        return false;
      }
    }

    if (localStorage.getItem(`${logIn + hashedPass}`)) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userName", logIn);

      setUserName(logIn);
      setIsLoggedIn(true);
      navigate("/");
    } else if (
      !localStorage.getItem(`${logIn + hashedPass}`) &&
      localStorage.getItem(`${logIn}`) !== " " &&
      localStorage.getItem(`${hashedPass}`) !== " "
    ) {
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
