import { useEffect, useState, useContext } from "react";
import "./content-card.styles.scss";
import { GlobalContext } from "../../context/GlobalState";
import Modal from "react-modal";

const ContentCard = (profile) => {
  Modal.setAppElement("#root");

  const { thumbnailUrl, firstName, lastName, likes, duration, clickLike, isReset, imageUrl } = profile;
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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsLoaded(false);
  };

  const handleHeartClick = () => {
    clickLike(null);
    setIsHeartLiked(!isHeartLiked);
  };

  const getSeconds = (x) => {
    const seconds = Math.floor((x - Math.floor(x)) * 60);
    return ("0" + seconds).slice(-2); // '04';
  };

  return (
    <>
      <div className="content-card-container">
        <div className="image-duration-scale" onClick={openModal}>
          <img className="content-img" src={thumbnailUrl} />
          <div className="duration">
            <p>{`${Math.floor(duration / 60)}:${getSeconds(duration)}`}</p>
          </div>
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
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal">
        <img onLoad={() => setIsLoaded(true)} className={`${!isLoaded ? "hidden" : ""} modal-image`} src={imageUrl} />
        <div className={!isLoaded ? "hidden" : ""}>
          <div className="modal-heart-circle" />
          <div className="modal-heart">
            <div
              onClick={handleHeartClick}
              className={`heart-animation modal-heart-animation  ${isHeartLiked ? "animate" : ""}`}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContentCard;
