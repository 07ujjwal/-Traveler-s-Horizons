import { useParams } from "react-router-dom";
import { usePosts } from "../../context/PostContext";
import styles from "./Post.module.css";
import { useEffect } from "react";
import BackButton from "../Buttons/BackButton";
function Post() {
  const { slug } = useParams();

  const { posts, isLoading, currentPost, getSinglePost } = usePosts();

  useEffect(() => {
    getSinglePost(slug);
  }, []);

  console.log(currentPost);

  return (
    <section className={styles.container}>
      <div className={styles.post}>
        <div className={styles.header}>
          <h2>{currentPost?.title}</h2>
          <h1>
            by <span>{currentPost?.user?.name}</span>
          </h1>
        </div>
        <div className={styles.body}>
          <p>caption: {currentPost?.caption}</p>
          <div>
            <div className={styles.review}>
              review: <p>{currentPost?.body}</p>
            </div>
          </div>
        </div>
        <BackButton />
      </div>
    </section>
  );
}

export default Post;
