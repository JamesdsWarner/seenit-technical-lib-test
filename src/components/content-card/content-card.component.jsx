import { useEffect, useState, useContext } from "react";
import "./content-card.styles.scss";
import { GlobalContext } from "../../context/GlobalState";

const ContentCard = (profile) => {
  const { thumbnailUrl, firstName, lastName, likes, duration, clickLike, isReset } = profile;
  const { setIsReset } = useContext(GlobalContext);

  const [isHeartLiked, setIsHeartLiked] = useState(false);

  useEffect(() => {
    if (isReset) {
      setIsHeartLiked(false);
      setIsReset(false);
    } else {
      return;
    }
  }, [isReset]);

  const handleHeartClick = () => {
    clickLike(null);
    setIsHeartLiked(!isHeartLiked);
  };

  const getSeconds = (x) => {
    const seconds = Math.floor((x - Math.floor(x)) * 60);
    return ("0" + seconds).slice(-2); // '04';
  };

  return (
    <div className="content-card-container">
      <img className="content-img" src={thumbnailUrl} />
      <div className="duration">
        <p>{`${Math.floor(duration / 60)}:${getSeconds(duration)}`}</p>
      </div>
      <div className="profile-info">
        <p>
          {firstName} {lastName}
        </p>
        <div>
          <div onClick={handleHeartClick} className={"heart-animation " + (isHeartLiked && "animate")}></div>
          <p className="likes">{likes}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
