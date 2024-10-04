import styles from "./City.module.css";
import { Link, useParams } from "react-router-dom";
import { useCities } from "../../context/CitiesContext";
import { useEffect } from "react";
import BackButton from "../Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner/Spinner";
import Button from "../Buttons/Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();

  const { getCitiyData, currentCity, isLoading } = useCities();

  const { user } = useAuth();

  useEffect(() => {
    getCitiyData(id, user.token);
  }, [id]);

  if (!currentCity) {
    return <p>City not found</p>; 
  }

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your Personal 😎 notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
          title={`Open ${cityName} on Wikipedia in a new tab`}
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div style={{ display: "flex", gap: "2rem" }}>
        <BackButton />
        <Link to={"/app/createPost"}>
          <Button type={"primary"}> Add Review </Button>
        </Link>
      </div>
    </div>
  );
}

export default City;
