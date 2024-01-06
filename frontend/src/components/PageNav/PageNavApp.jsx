import { NavLink } from "react-router-dom";
import styles from "./PageNavApp.module.css";
import Logo from "../Logo/Logo";

function PageNavApp() {
  return (
    <div>
      <nav className={styles.nav}>
        <Logo />

        <ul>
          <li>
            <NavLink to="/pricing">About</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/signup">SignUp</NavLink>
          </li>
          <li>
            <NavLink to="/app" className={styles.ctaLink}>
              Start
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageNavApp;
