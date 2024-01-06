import { useState } from "react";
import { usePosts } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Buttons/Button";

function CreatePost() {
  const { createPost } = usePosts();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !content || !caption) return;

    const newPost = {
      title,
      caption,
      content,
    };

    await createPost(newPost, user.token);

    alert("Added 👍");

    navigate("/app/cities");
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
      onClick={handleSubmit}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <label htmlFor="title">City Name or Post Name</label>
        <input
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <label htmlFor="caption">Caption</label>
        <input
          id="caption"
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <label htmlFor="body">Your Story</label>
        <input
          id="body"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          style={{
            height: "12rem",
            width: "100%",
          }}
        />
      </div>
      <div>
        <Button type={"primary"}>Create Post</Button>
      </div>
    </form>
  );
}

export default CreatePost;
