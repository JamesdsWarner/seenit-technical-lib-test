import ContentCard from "../content-card/content-card.component";
import Spinner from "../spinner/spinner.component";
import axios, { AxiosError } from "axios";
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
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}`, {
          headers: {
            Authorization: `BASIC ${process.env.REACT_APP_TOKEN}`,
          },
          params: {
            page: 1,
            perPage: 100,
          },
        });
        setAllProfiles([...resp.data.rows]);
        setIsError(false);
      } catch (error) {
        setIsError(true);
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
    setProfileArray(clonedProfileArray.slice(0, 30));
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

  const n = 7;

  return (
    <div className="content-cards-container">
      {profileArray.length >= 1 ? (
        <InfiniteScroll
          dataLength={isLiked ? likedProfiles.length : profileArray.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Spinner />}
          style={{
            overflow: "none",
          }}
          endMessage={
            <p className="end-message">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {profileArray.map((profile) => {
            return (
              <div className="content-card" key={profile.duration}>
                <div className="content-card-inner">
                  <ContentCard
                    thumbnailUrl={profile.thumbnailUrl}
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    likes={profile.likes}
                    duration={profile.duration}
                    imageUrl={profile.imageUrl}
                    clickLike={() => handleClick(profile)}
                    isReset={isReset}
                  />
                </div>
              </div>
            );
          })}
          {[...Array(n)].map((e, i) => (
            <div key={i} className="content-card">
              <div className="content-card-inner" />
            </div>
          ))}
        </InfiniteScroll>
      ) : isLiked ? (
        <span>You have no likes</span>
      ) : !isError ? (
        <Spinner />
      ) : (
        <div role="alert">
          <p>Something went wrong</p>
          <p>Uh Oh. Check your permissions and try again</p>
        </div>
      )}
    </div>
  );
};

export default ContentCards;
