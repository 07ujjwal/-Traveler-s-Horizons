import { Link } from "react-router-dom";
import PageNav from "../../components/PageNav/PageNav";
import { useAuth } from "../../context/AuthContext";
import styles from "./Homepage.module.css";
import Button from "../../components/Buttons/Button";

export default function Homepage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <main className={styles.homepage}>
      <PageNav />
      {isAuthenticated ? (
        <section>
          <h2>
            Hey {user.name} Thrilled to spill the beans on your upcoming
            adventure! 🚀
          </h2>
          <div>
            <h2>Check out what others have to say about their trips. 🌟🌍</h2>
          </div>
          <Link to={"/posts"}>
            <Button type={"primary"}>View All posts and Reviews</Button>
          </Link>
        </section>
      ) : (
        <section>
          <h1>
            Globetrotting is your game, and
            <br />
            Traveler's Horizons is your scorekeeper! 🌍✈️
          </h1>
          <h2>
            Chart your global journey, share with friends, and flaunt your
            wanderlust on a world map! 🌎👣✨
          </h2>
          <Link to={"/login"}>
            <Button type={"primary"}>View All posts and Reviews</Button>
          </Link>
        </section>
      )}
    </main>
  );
}
