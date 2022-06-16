import { GlobalContext } from "../../context/GlobalState";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    allProfilesCopy,
    setIsReset,
    setLikedProfiles,
    setAllProfilesCopy,
  } = useContext(GlobalContext);

  const [sort, setSort] = useState("");
  const [conditionalBannerLikes, setConditionalBannerLikes] = useState("Likes");
  const [conditionalAlphabet, setConditionalAlphabet] = useState("Alphabet");

  const handleAllClick = () => {
    if (!isLiked) {
      setProfileArray(allProfilesCopy.slice(0, 30));
      setIsLiked(false);
    } else {
      setProfileArray(allProfilesCopy.slice(0, 30));
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

  const handleNoneClick = () => {
    setSort("None");
    setConditionalBannerLikes("Likes");
    setProfileArray([...allProfilesCopy]);
    setSortLowestLiked(false);
    setIsSorted(false);
    setSortAlpha(false);
    setSortHighestLiked(false);
    setSortLowestLiked(false);
  };

  const handleAlphaClick = () => {
    if (sortAlpha) {
      setIsSorted(false);
      setProfileArray([...allProfilesCopy]);
      setSort("");
      setConditionalAlphabet("Alphabet");
    } else {
      setConditionalBannerLikes("Likes");
      setIsSorted(true);
      setProfileArray([...profileArray].sort((a, b) => a.firstName.localeCompare(b.firstName)));
      setSort("Alphabet");
      setConditionalAlphabet(<span>Alphabet</span>);
    }
    setSortAlpha(() => !sortAlpha);
  };

  const handleLikedSortClick = () => {
    setSortAlpha(false);
    setConditionalAlphabet("Alphabet");
    if (!sortHighestLiked && !sortLowestLiked) {
      setProfileArray(
        [...profileArray].sort((a, b) => {
          return b.likes - a.likes;
        })
      );
      setConditionalBannerLikes("Highest");
      setSort("Highest");
      setSortHighestLiked(true);
      setIsSorted(true);
      return;
    } else if (sortHighestLiked) {
      setProfileArray(
        [...profileArray].sort((a, b) => {
          return a.likes - b.likes;
        })
      );
      setConditionalBannerLikes("Lowest");
      setSort("Lowest");
      setSortHighestLiked(false);
      setSortLowestLiked(true);
      return;
    } else if (sortLowestLiked) {
      setConditionalBannerLikes("Likes");
      setSort("");
      setProfileArray([...allProfilesCopy]);
      setSortLowestLiked(false);
      setIsSorted(false);
      return;
    }
  };

  const handleResetClick = () => {
    setSort("None");
    setConditionalBannerLikes("Likes");
    const newAllProfilesClone = allProfiles.map((profile) => {
      return { ...profile };
    });
    setAllProfilesCopy(newAllProfilesClone);
    setProfileArray(newAllProfilesClone.slice(0, 30));
    setLikedProfiles([]);
    setIsReset(true);
    setSortLowestLiked(false);
    setIsSorted(false);
    setSortAlpha(false);
    setSortHighestLiked(false);
    setSortLowestLiked(false);
  };

  return (
    <div className="banner-container">
      <div className="banner-text">
        <div className="button green-button">
          <span onClick={handleAllClick}>All</span>
        </div>
        <div className="button green-button">
          <span onClick={handleLikedClick}>Liked</span>
        </div>

        <FormControl className="form" sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Sort By</InputLabel>
          <Select labelId="demo-select-small" id="demo-select-small" value={sort} label="Sort By">
            <MenuItem value={"None"} onClick={handleNoneClick}>
              None
            </MenuItem>
            <MenuItem value={"Alphabet"} onClick={handleAlphaClick}>
              {conditionalAlphabet}
            </MenuItem>
            <MenuItem value={conditionalBannerLikes} onClick={handleLikedSortClick}>
              {conditionalBannerLikes}
            </MenuItem>
          </Select>
        </FormControl>

        <div className="button reset-button">
          <span onClick={handleResetClick}>Reset</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
