import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostContext";
import styles from "./PostItems.module.css";
import { Link } from "react-router-dom";
function PostItems({ post }) {
  const { posts, currentPost, deletePost } = usePosts();

  const { title, caption, body, slug } = post;

  const { isAuthenticated, user } = useAuth();

  function handleClick(e) {
    e.preventDefault();
    deletePost(slug, user.token);
  }

  return (
    <li>
      <Link
        className={`${styles.postItem} ${
          slug === currentPost?.slug ? styles["postItem--active"] : ""
        }`}
        to={`/post/${slug}`}
      >
        <span>{"Title/City"}</span>
        <h3 className={styles.name}>{title}</h3>
        <p>{caption}</p>
        {isAuthenticated && user.isadmin === true && (
          <button onClick={handleClick} className={styles.deleteBtn}>
            x
          </button>
        )}
      </Link>
    </li>
  );
}

export default PostItems;
