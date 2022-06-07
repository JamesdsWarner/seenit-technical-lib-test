import { GlobalContext } from "../../context/GlobalState";
import { useContext } from "react";
import "./banner.styles.scss";

const Banner = () => {
  const {
    setIsSorted,
    sortAlpha,
    setSortAlpha,
    sortLowestLiked,
    setSortLowestLiked,
    sortHighestLiked,
    setSortHighestLiked,
    profileArray,
    setProfileArray,
    allProfiles,
    likedProfiles,
    setIsLiked,
    isLiked,
    likeCounterArray,
    allProfilesCopy,
  } = useContext(GlobalContext);

  const handleAllClick = () => {
    if (!isLiked) {
      setProfileArray(allProfilesCopy);
      setIsLiked(true);
    } else {
      setProfileArray(allProfilesCopy);
      setIsLiked(false);
    }
  };

  const handleLikedClick = () => {
    if (isLiked) {
      return;
    } else {
      setProfileArray(likedProfiles);
      setIsLiked(!isLiked);
    }
  };

  const handleAlphaClick = () => {
    if (sortAlpha) {
      setIsSorted(false);
      setProfileArray([...allProfilesCopy]);
    } else {
      setIsSorted(true);
      setProfileArray([...profileArray].sort((a, b) => a.firstName.localeCompare(b.firstName)));
    }
    setSortAlpha(() => !sortAlpha);
  };

  const handleLikedSortClick = () => {
    if (!sortHighestLiked && !sortLowestLiked) {
      setProfileArray(
        [...profileArray].sort((a, b) => {
          return b.likes - a.likes;
        })
      );
      setSortHighestLiked(true);
      setIsSorted(true);
      return;
    } else if (sortHighestLiked) {
      setProfileArray(
        [...profileArray].sort((a, b) => {
          return a.likes - b.likes;
        })
      );
      setSortHighestLiked(false);
      setSortLowestLiked(true);
      return;
    } else if (sortLowestLiked) {
      setProfileArray([...allProfilesCopy]);
      setSortLowestLiked(false);
      setIsSorted(false);
      return;
    }
  };

  return (
    <div className="banner-container">
      <div className="banner-text">
        <span onClick={handleAllClick}>All</span>
        <span onClick={handleLikedClick}>Liked</span>
        <span>Sort by:</span>
        <span onClick={handleAlphaClick}>Alphabet</span>
        <span onClick={handleLikedSortClick}>
          {!sortLowestLiked && !sortHighestLiked ? "Likes" : sortHighestLiked ? "Highest" : sortLowestLiked && "Lowest"}
        </span>
      </div>
    </div>
  );
};

export default Banner;
