import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./ProfilePage.module.css";
import Button from "../../components/Buttons/Button";
import BackButton from "../../components/Buttons/BackButton";
import ProfilePicture from "../../components/ProfilePic/ProfilePicture";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../utils/validations";

function ProfilePage() {
  const { user, userProfile, logout, updateProfile, getUserProfile } =
    useAuth();

  const navigate = useNavigate();

  const [userData, setuserData] = useState(userProfile);

  const [userName, setuserName] = useState();
  const [useremail, setuserEmail] = useState();
  // const [userpicture, setUserPicture] = useState("");
  const [userpassword, setuserPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    async function getProfile() {
      await getUserProfile({ token: user.token });
      setuserData(userProfile);
      console.log(userData);
    }
    getProfile();
  }, [user.token]);

  const { name, email } = user;

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValidEmail(useremail)) {
      alert("Invalid email format");
      return;
    }
    if (!isValidPassword(userpassword)) {
      alert("Invalid password format");
      return;
    }

    if (userpassword !== confirmPassword) {
      alert("enter same password");
      return;
    }

    updateProfile({
      token: user.token,
      userData: { name: userName, email: useremail, password: userpassword },
    });

    alert("profile updated sucessfully");
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.profilepage}>
      <div className={styles.nav}>
        <ProfilePicture />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Your Profile Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setuserName(e.target.value)}
            value={userName}
            placeholder={name}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Your Current Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setuserEmail(e.target.value)}
            value={useremail}
            placeholder={email}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setuserPassword(e.target.value)}
            value={userpassword}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password-Verify">Confirm New Password</label>
          <input
            type="password"
            id="password-verify"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <div className={styles.buttons}>
          <Button type="primary">Apply</Button>
        </div>
      </form>
      <div className={styles.btn_component}>
        <BackButton />
        <button className={styles.btnlout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
