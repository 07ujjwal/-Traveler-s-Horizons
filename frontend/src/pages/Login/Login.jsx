import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { isValidEmail, isValidPassword } from "../../utils/validations";

export default function Login() {
  const [email, setEmail] = useState("ujjwalphy3@gmail.com");
  const [password, setPassword] = useState("123456");

  const { isAuthenticated, login } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert("Invalid email format");
      return;
    }
    if (!isValidPassword(password)) {
      alert("Invalid password format");
      return;
    }

    console.log("yo", isAuthenticated);
    login({ email, password });
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          position: "absolute",
          alignItems: "center",
          right: "5rem",
          gap: "2rem",
        }}
      >
        <BackButton />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <p
          style={{
            color: "aqua",
          }}
        >
          Does Not have an account :
        </p>
        <Link to={"/signup"}>
          <Button type={"back"}>SignUp</Button>{" "}
        </Link>
      </div>
    </main>
  );
}
