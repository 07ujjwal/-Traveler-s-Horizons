import SideBar from "../../components/Sidebar/SideBar";
import Map from "../../components/Map/Map";
import styles from "./AppLayout.module.css";
import User from "../../components/UserComponent/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
