import ContentCard from "../content-card/content-card.component";
import Spinner from "../spinner/spinner.component";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
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
    setAllProfilesCopy,
    isReset,
    allProfilesCopy,
  } = useContext(GlobalContext);

  const [hasMore, setHasMore] = useState(true);

  const sendGetRequest = async () => {
    try {
      const resp = await axios.get("https://tech-test-service-staging.seenit.studio/v1/uploads", {
        headers: {
          Authorization: "BASIC james@seenit.io",
        },
        params: {
          page: 1,
          perPage: 100,
        },
      });
      setAllProfiles([...resp.data.rows]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    sendGetRequest();
  }, []);

  useEffect(() => {
    const clonedProfileArray = allProfiles.map((profile) => {
      return { ...profile };
    });
    setAllProfilesCopy(clonedProfileArray);
    setProfileArray(clonedProfileArray.slice(0, 10));
  }, [allProfiles]);

  const fetchMoreData = () => {
    if (profileArray.length >= 100) {
      setHasMore(false);
    }
    setTimeout(() => {
      setProfileArray(allProfilesCopy.slice(0, profileArray.length + 10));
    }, 1000);
    console.log(profileArray);
  };

  const handleClick = (profileToAdd) => {
    const found = likedProfiles.find((profile) => profile.firstName === profileToAdd.firstName);
    console.log(allProfiles);
    if (found) {
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
      likedProfiles.indexOf(profileToAdd) === -1 && setLikedProfiles([...likedProfiles, profileToAdd]);
    }
    console.log(likedProfiles);
  };

  return (
    <div className="content-cards-container">
      {profileArray.length >= 1 ? (
        <div>
          <InfiniteScroll
            dataLength={isLiked ? likedProfiles.length : profileArray.length} //This is important field to render the next data
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className="scroll-text">Loading...</h4>}
            style={{
              overflow: "none",
            }}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
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
                    isReset={isReset}
                  />
                </div>
              );
            })}
          </InfiniteScroll>
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
