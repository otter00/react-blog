import "./SignUpPageStyles.scss";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { useState } from "react";

export const SignUpPage = () => {
  let navigate = useNavigate();

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const handleRegisterUsername = (e) => {
    setRegisterUsername(e.target.value);
  };

  const handleRegisterEmail = (e) => {
    setRegisterEmail(e.target.value);
  };

  const handleRegisterPassword = (e) => {
    setRegisterPassword(e.target.value);
  };

  const handleRepeatPassword = (e) => {
    setRepeatedPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // if (logIn === "Anastasia Ivleva") {
    //   if (password === "12345") setIsOwner(true);
    //   else {
    //     alert("wrong");
    //     return false;
    //   }
    // }

    if (registerPassword === repeatedPassword) {
      console.log("yes");
      console.log(`user: ${registerUsername}, email: ${registerEmail}, 
      pass: ${registerPassword}, repeated pass: ${repeatedPassword}`);

      if (!localStorage.getItem(`${registerUsername + registerPassword}`)) {
        alert("not exist");
        localStorage.setItem(
          `${registerUsername + registerPassword}`,
          registerUsername + registerPassword
        );

        navigate("/login");
      } else alert("user exists");
    } else {
      console.log("not");
      console.log(`user: ${registerUsername}, email: ${registerEmail}, 
      pass: ${registerPassword}, repeated pass: ${repeatedPassword}`);

      navigate("/signup");
    }
  };

  return (
    <h1>
      <form className="signup__form" onSubmit={handleSignUp}>
        <h2>Регистрация</h2>
        <div>
          <input
            autoComplete="off"
            type="text"
            className="signup-form__input"
            placeholder="Enter your name"
            name="formSignup"
            onChange={handleRegisterUsername}
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
            onChange={handleRegisterEmail}
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
            onChange={handleRegisterPassword}
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
            onChange={handleRepeatPassword}
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
