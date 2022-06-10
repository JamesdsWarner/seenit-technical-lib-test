import React, { createContext, useState } from "react";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [allProfiles, setAllProfiles] = useState([]);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [sortAlpha, setSortAlpha] = useState(false);
  const [sortHighestLiked, setSortHighestLiked] = useState(false);
  const [sortLowestLiked, setSortLowestLiked] = useState(false);
  const [profileArray, setProfileArray] = useState([]);
  const [allProfilesCopy, setAllProfilesCopy] = useState([]);
  const [isReset, setIsReset] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        allProfiles,
        setAllProfiles,
        likedProfiles,
        setLikedProfiles,
        isLiked,
        setIsLiked,
        isSorted,
        setIsSorted,
        sortAlpha,
        setSortAlpha,
        sortHighestLiked,
        setSortHighestLiked,
        sortLowestLiked,
        setSortLowestLiked,
        profileArray,
        setProfileArray,
        allProfilesCopy,
        setAllProfilesCopy,
        isReset,
        setIsReset,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
