// PageNav.js
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { FiAlignJustify, FiXCircle } from "react-icons/fi";
import styles from "./PageNav.module.css";
import { useAuth } from "../../context/AuthContext";
import PictureComponent from "../ProfilePic/PictureComponent";
import Button from "../Buttons/Button";
import { useState } from "react";

function PageNav() {
  const { isAuthenticated } = useAuth();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      {isAuthenticated ? <PictureComponent /> : <Logo />}
      <div className={isMobileMenuOpen ? styles.mobileNav : styles.navLinks}>
        {!isAuthenticated && <NavLink to="/signup">SignUp</NavLink>}

        {isAuthenticated ? (
          <NavLink to="/app" className={styles.ctaLink}>
            Let's Start
          </NavLink>
        ) : (
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        )}
      </div>
      {!isMobileMenuOpen && (
        <div className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
          <Button type={"back"}>
            {" "}
            <FiAlignJustify />
          </Button>
        </div>
      )}

      {isMobileMenuOpen && (
        <Button type={"back"} onClick={closeMobileMenu}>
          {" "}
          <FiXCircle />
        </Button>
      )}
    </nav>
  );
}

export default PageNav;
