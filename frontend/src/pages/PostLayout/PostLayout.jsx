import styles from "./PostLayout.module.css";
import User from "../../components/UserComponent/User";
import PostList from "../../components/PostList/PostList";

function PostLayout() {
  return (
    <div className={styles.app}>
      <User />
      <PostList />
    </div>
  );
}

export default PostLayout;
