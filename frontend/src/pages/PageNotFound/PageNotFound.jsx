import { Link, NavLink } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={styles.Page}>
      <h1>Page not found 😢 choose the path</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="app/cities">Cities</Link>
          </li>
          <li>
            <Link to="app/countries">Countries</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
