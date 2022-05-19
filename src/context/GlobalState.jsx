import React, { createContext, useState } from "react";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [allProfiles, setAllProfiles] = useState([]);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isSorted, setIsSorted] = useState(false);
  const [sortAlpha, setSortAlpha] = useState(false);
  const [sortHighestLiked, setSortHighestLiked] = useState(false);
  const [sortLowestLiked, setSortLowestLiked] = useState(false);
  const [sortDuration, setSortDuration] = useState(false);
  const [profileArray, setProfileArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        allProfiles,
        setAllProfiles,
        likedProfiles,
        setLikedProfiles,
        isLiked,
        setIsLiked,
        filter,
        setFilter,
        isSorted,
        setIsSorted,
        sortAlpha,
        setSortAlpha,
        sortHighestLiked,
        setSortHighestLiked,
        sortLowestLiked,
        setSortLowestLiked,
        sortDuration,
        setSortDuration,
        sortedArray,
        setSortedArray,
        profileArray,
        setProfileArray,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
