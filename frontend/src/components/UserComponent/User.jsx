import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./User.module.css";
import { HiOutlineCamera } from "react-icons/hi";
import PictureComponent from "../ProfilePic/PictureComponent";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      {user.picture ? (
        <PictureComponent />
      ) : (
        <HiOutlineCamera className={styles.userimg} />
      )}
      <Link className={styles.Link} to={"/profile"}>
        <span>Welcome, {user.name}</span>
      </Link>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
