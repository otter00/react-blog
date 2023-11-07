import "./LoginPageStyles.scss";

import { CustomButton } from "../../UI/CustomButton/CustomButton";

export const LoginPage = () => {
  return (
    <h1>
      <form className="login__form" action="">
        <h2>Авторизация</h2>
        <div>
          <input
            autocomplete="off"
            type="text"
            className="login-form__input"
            placeholder="Login"
            name="formLogin"
            required
          />
        </div>

        <div>
          <input
            autocomplete="off"
            type="password"
            className="login-form__input"
            placeholder="Password"
            name="formPassword"
            required
          />
        </div>

        <CustomButton className={"CustomButtonStyle"} name={"Войти"} />
      </form>
    </h1>
  );
};
