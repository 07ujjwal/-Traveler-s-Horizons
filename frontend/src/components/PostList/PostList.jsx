import { useEffect, useState } from "react";
import { usePosts } from "../../context/PostContext";
import Message from "../Message/Message";
import PostItems from "../PostItems/PostItems";
import Spinner from "../Spinner/Spinner";
import styles from "./PostList.module.css";
import BackButton from "../Buttons/BackButton";
function PostList() {
  const { posts, isLoading, dispatch, getAllPosts } = usePosts();

  const [searchKeyword, setSearchKeyword] = useState();

  console.log(searchKeyword);

  let limit;
  posts.length > 10 ? (limit = posts.length) : 10;

  useEffect(() => {
    getAllPosts(searchKeyword, limit);
  }, [searchKeyword, limit]);

  if (isLoading) return <Spinner />;

  if (!posts.length) return <Message message="No Post Found ⛔" />;

  return (
    <>
      <div className={styles.div_0}>
        <div className={styles.div_1}>
          <form>
            <div className={styles.search}>
              <label htmlFor="search">Search for post</label>
              <input
                type="text"
                id="search"
                onChange={(e) => setSearchKeyword(e.target.value)}
                value={searchKeyword}
              />
            </div>
          </form>
          <ul className={styles.postList}>
            {posts.map((post) => (
              <PostItems key={post.slug} post={post} />
            ))}
          </ul>
        </div>
        <BackButton />
      </div>
    </>
  );
}

export default PostList;
