import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo";
import { Link, Outlet } from "react-router-dom";
import AppNav from "../AppNav/AppNav";
import Button from "../Buttons/Button";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <div className={styles.footer_container}>
        <Link to={"/"}>
          <Button type={"primary"}>Home</Button>
        </Link>
        <footer className={styles.footer}>
          <p className={styles.copyright}>
            &copy; Copyright {new Date().getFullYear()} by singh ujjwal 😎.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SideBar;
