import "./LoginPageStyles.scss";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../UI/CustomButton/CustomButton";

export const LoginPage = (props) => {
  let navigate = useNavigate();
  console.log(props);

  const handleLogin = (e) => {
    e.preventDefault();
    //console.log("hello");
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
            required
          />
        </div>

        <CustomButton className={"CustomButtonStyle"} name={"Войти"} />
      </form>
    </h1>
  );
};
