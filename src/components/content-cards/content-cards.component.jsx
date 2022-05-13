import ContentCard from "../content-card/content-card.component";
import Spinner from "../spinner/spinner.component";
import axios from "axios";
import { useEffect, useState } from "react";
import "./content-cards.styles.scss";

const ContentCards = () => {
  const [profiles, setProfiles] = useState([]);
  const [likedProfiles, setLikedProfiles] = useState([]);

  const handleClick = (profileToAdd) => {
    const found = likedProfiles.find((profile) => profile.firstName === profileToAdd.firstName);

    if (found) {
      const profileRemovedArray = likedProfiles.filter((likedProfile) => {
        return likedProfile.firstName !== profileToAdd.firstName;
      });
      setLikedProfiles([...profileRemovedArray]);
    } else {
      likedProfiles.indexOf(profileToAdd) === -1 &&
        setLikedProfiles([...likedProfiles, { ...profileToAdd, liked: true }]);
    }

    console.log(likedProfiles);
  };

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const resp = await axios.get("https://tech-test-service-staging.seenit.studio/v1/uploads", {
          headers: {
            Authorization: "BASIC james@seenit.io",
          },
        });
        setProfiles([...resp.data.rows]);
        console.log(profiles);
      } catch (error) {
        console.error(error);
      }
    };

    sendGetRequest();
  }, []);

  return (
    <div className="content-cards-container">
      {profiles.length > 1 ? (
        <div>
          {profiles.map((profile) => {
            return (
              <div key={profile.duration}>
                <ContentCard
                  thumbnailUrl={profile.thumbnailUrl}
                  firstName={profile.firstName}
                  lastName={profile.lastName}
                  likes={profile.likes}
                  duration={profile.duration}
                  clickLike={() => handleClick(profile, null)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ContentCards;
