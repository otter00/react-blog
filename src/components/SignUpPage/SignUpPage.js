import "./SignUpPageStyles.scss";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { useState } from "react";

export const SignUpPage = (
  {
    //   isLoggedIn,
    //   setIsLoggedIn,
    //   setUserName,
    //   setIsOwner,
  }
) => {
  let navigate = useNavigate();
  // console.log(isLoggedIn);

  //   const [logIn, setLogIn] = useState("");
  //   const [password, setPassword] = useState("");

  //   const handleLogInChange = (e) => {
  //     setLogIn(e.target.value);
  //   };

  //   const handlePasswordChange = (e) => {
  //     setPassword(e.target.value);
  //   };

  //   const handleLogin = (e) => {
  //     e.preventDefault();

  //     if (logIn === "Anastasia Ivleva") {
  //       if (password === "12345") setIsOwner(true);
  //       else {
  //         alert("wrong");
  //         return false;
  //       }
  //     }

  //     localStorage.setItem("isLoggedIn", true);
  //     localStorage.setItem("userName", logIn);

  //     setUserName(logIn);
  //     //console.log("hello");
  //     setIsLoggedIn(true);
  //     navigate("/");
  //   };

  return (
    <h1>
      <form
        className="signup__form"
        //onSubmit={handleLogin}
      >
        <h2>Регистрация</h2>
        <div>
          <input
            autoComplete="off"
            type="text"
            className="signup-form__input"
            placeholder="Enter your name"
            name="formSignup"
            //onChange={handleLogInChange}
            required
          />
        </div>

        <div>
          <input
            autoComplete="off"
            type="email"
            className="signup-form__input"
            placeholder="Enter your email"
            name="formEmail"
            //onChange={handleLogInChange}
            required
          />
        </div>

        <div>
          <input
            autoComplete="off"
            type="password"
            className="signup-form__input"
            placeholder="Enter your password"
            name="formPassword"
            //onChange={handlePasswordChange}
            required
          />
        </div>

        <div>
          <input
            autoComplete="off"
            type="password"
            className="signup-form__input"
            placeholder="Repeat your password"
            name="formPassword"
            //onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="processing__agreement">
          <input
            type="checkbox"
            name="formProcessingAgreement"
            id="formProcessingAgreement"
            //onChange={handlePasswordChange}
            required
          />

          <label for="formProcessingAgreement">
            I agree to the processing of my personal information
          </label>
        </div>

        <CustomButton
          className={"CustomButtonStyle"}
          name={"Зарегистрироваться"}
        />
      </form>
    </h1>
  );
};
