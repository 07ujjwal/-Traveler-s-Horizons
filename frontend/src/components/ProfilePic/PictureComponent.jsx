import { useAuth } from "../../context/AuthContext";
import stables from "../../constants/stables";
import { HiOutlineCamera } from "react-icons/hi";
function PictureComponent() {
  const { user } = useAuth();
  console.log(user.picture);

  return (
    <div>
      {user.picture ? (
        <img
          src={stables.UPLOAD_FOLDER_BASE_URL + user.picture}
          alt="profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ) : (
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#eee",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HiOutlineCamera style={{ fontSize: "2rem", color: "#555" }} />
        </div>
      )}
    </div>
  );
}

export default PictureComponent;
