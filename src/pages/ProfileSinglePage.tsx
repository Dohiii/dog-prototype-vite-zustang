import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../assets/styles/ProfileSinglePage.module.css";
import axios from "axios";
import { useAuthStore } from "../stores/authorisation.store";

interface IProfile {
  user: string;
  conversations: string[];
  dogs: string[];
  avatar: string;
  firstName: string;
  lastName: number;
  location: string;
  username: string;
  _id: string;
  __v: number;
}

interface IProfileResponse {
  user: string;
  conversations: string[];
  dogs: string[];
  avatar: string;
  firstName: string;
  lastName: number;
  location: string;
  username: string;
  _id: string;
  __v: number;
}

const ProfileSinglePage = () => {
  const { id } = useParams<{ id: string }>();

  const [profile, setProfile] = React.useState<IProfile | null>(null);

  const { accessToken } = useAuthStore();

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  React.useEffect(() => {
    // fetch Profile data from API using the ID parameter
    axios
      .get<IProfileResponse>(`/profiles/${id}`, config)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Link to="/profiles">Back</Link>
      <img
        src={profile.avatar}
        alt={profile.username}
        className={styles.image}
      />
      <div className={styles.info}>
        <h2 className={styles.name}>{profile.username}</h2>
        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.label}>
              Owner: {` name - ${profile.location}`}{" "}
              <Link to="/profiles">Contact owner</Link>
            </span>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>firstName:</span>
            <span>{profile.firstName}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>lastName:</span>
            <span>{profile.lastName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSinglePage;
