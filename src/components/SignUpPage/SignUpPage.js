import "./SignUpPageStyles.scss";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export const SignUpPage = () => {
  let navigate = useNavigate();

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [checked, setChecked] = useState(false);

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

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

    if (registerPassword === repeatedPassword) {
      console.log("passes are equal");
      console.log(`user: ${registerUsername}, email: ${registerEmail}, 
      pass: ${registerPassword}, repeated pass: ${repeatedPassword}`);

      if (!localStorage.getItem(`${registerUsername + registerPassword}`)) {
        alert("not exist");
        localStorage.setItem(
          `${registerUsername + registerPassword}`,
          registerUsername + registerPassword
        );

        navigate("/login");
      } else {
        alert("user exists");
      }
    } else {
      alert("passes aren't equal");
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
          <FormControlLabel
            control={
              <Checkbox
                required
                color="success"
                checked={checked}
                onChange={handleChecked}
              />
            }
            label="I agree to the processing of my personal information"
          />
        </div>

        <CustomButton
          className={"CustomButtonStyle"}
          name={"Зарегистрироваться"}
        />
      </form>
    </h1>
  );
};

{
  /* <input
            type="checkbox"
            name="formProcessingAgreement"
            id="formProcessingAgreement"
            required
          />

          <label for="formProcessingAgreement">
            I agree to the processing of my personal information
          </label> */
}
