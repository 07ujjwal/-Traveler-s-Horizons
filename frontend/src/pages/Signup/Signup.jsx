import { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import Button from "../../components/Buttons/Button";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "react";
function Signup() {
  const [email, setEmail] = useState("ujjwalphy3@gmail.com");
  const [password, setPassword] = useState("123456");
  const [name, setName] = useState("ujjwal");

  const { isAuthenticated, signup } = useAuth();

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

    signup({ name, email, password });
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.signup}>
      <p className={styles.infoMessage}>
        Please be aware that the initial rendering of the application may take
        up to 40 seconds. This delay is due to the initial setup and loading
        processes. Thank you for your patience.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
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
          <Button type="primary">SignUp</Button>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {" "}
        <p
          style={{
            color: "aqua",
          }}
        >
          Already having an account :
        </p>
        <Link to={"/login"}>
          <Button type={"back"}>Login</Button>{" "}
        </Link>
      </div>
      <div>
        <Link to={"/"}>
          <Button type={"primary"}>Back</Button>{" "}
        </Link>
      </div>
    </main>
  );
}

export default Signup;
