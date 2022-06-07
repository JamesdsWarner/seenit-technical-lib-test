import ContentCard from "../content-card/content-card.component";
import Spinner from "../spinner/spinner.component";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "./content-cards.styles.scss";

const ContentCards = () => {
  const {
    allProfiles,
    setAllProfiles,
    likedProfiles,
    setLikedProfiles,
    profileArray,
    setProfileArray,
    isLiked,
    setLikeCounterArray,
    likeCounterArray,
    allProfilesCopy,
    setAllProfilesCopy,
    isFound,
    setIsFound,
  } = useContext(GlobalContext);

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const resp = await axios.get("https://tech-test-service-staging.seenit.studio/v1/uploads", {
          headers: {
            Authorization: "BASIC james@seenit.io",
          },
        });
        setAllProfiles([...resp.data.rows]);
        // console.log(allProfiles);
      } catch (error) {
        console.error(error);
      }
    };

    sendGetRequest();
  }, []);

  useEffect(() => {
    const clonedProfileArray = allProfiles.map((profile) => {
      return { ...profile };
    });
    setAllProfilesCopy(clonedProfileArray);
    setProfileArray(clonedProfileArray);
    setLikeCounterArray(clonedProfileArray);
  }, [allProfiles]);

  const handleClick = (profileToAdd) => {
    const found = likedProfiles.find((profile) => profile.firstName === profileToAdd.firstName);
    const objIndex = profileArray.findIndex((profile) => profile.firstName === profileToAdd.firstName);
    console.log(allProfiles);

    if (found) {
      setIsFound(true);
      profileArray.map((profile) =>
        profile.firstName === profileToAdd.firstName ? { ...profileToAdd, likes: profileToAdd.likes-- } : profile
      );
      setLikedProfiles(
        likedProfiles.filter((likedProfile) => {
          return likedProfile.firstName !== profileToAdd.firstName;
        })
      );
    } else {
      profileArray.map((profile) =>
        profile.firstName === profileToAdd.firstName ? { ...profileToAdd, likes: profileToAdd.likes++ } : profile
      );
      setIsFound(false);
      likedProfiles.indexOf(profileToAdd) === -1 && setLikedProfiles([...likedProfiles, profileToAdd]);
    }

    console.log(likedProfiles);
  };

  return (
    <div className="content-cards-container">
      {profileArray.length >= 1 ? (
        <div>
          {profileArray.map((profile) => {
            return (
              <div key={profile.duration}>
                <ContentCard
                  thumbnailUrl={profile.thumbnailUrl}
                  firstName={profile.firstName}
                  lastName={profile.lastName}
                  likes={profile.likes}
                  duration={profile.duration}
                  clickLike={() => handleClick(profile)}
                />
              </div>
            );
          })}
        </div>
      ) : isLiked ? (
        <span>You have no likes</span>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ContentCards;
