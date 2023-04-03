import React from "react";
import LikeImg from "../assets/like.svg";
import UnlikeImg from "../assets/unlike.svg";
import LikedImg from "../assets/liked.svg";
import UnlikedImg from "../assets/unliked.svg";
import { axiosInstance } from "../utils/axios";
import { useState } from "react";


const LikeUnlike = ({id, likes, unlikes }) => {
  const [like, setLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  const [unlike, setUnlikes] = useState(unlikes);
  const [isUnliked, setIsUnliked] = useState(false);


  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    let updatedLikes = isLiked ? likes : likes + 1;
    try {
      const response = await axiosInstance.patch(`/videos/${id}`, {
        likes: updatedLikes,
        unlikes: unlikes,
      });
      setLikes(response.data.likes);
      setUnlikes(response.data.unlikes);
      setIsUnliked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlikeClick = async () => {
    setIsUnliked(!isUnliked);
    let updatedUnlikes = isUnliked ? unlikes : unlikes + 1;
    try {
      const response = await axiosInstance.patch(`/videos/${id}`, {
        unlikes: updatedUnlikes,
        likes: likes,
      });
      setUnlikes(response.data.unlikes);
      setLikes(response.data.likes);
      setIsLiked(false)
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="flex gap-10 w-48">
      <div className="flex gap-1 cursor-pointer" title="I like this" onClick={handleLikeClick}>
        <div className="shrink-0">
          <img className="w-5 block" src={isLiked ? LikedImg : LikeImg} alt="Like" />
        </div>
        <div className="text-sm leading-[1.7142857] text-slate-600">
          {like}
        </div>
      </div>
      <div className="flex gap-1 cursor-pointer" title="I dislike this" onClick={handleUnlikeClick}>
        <div className="shrink-0">
          <img className="w-5 block" src={isUnliked ? UnlikedImg : UnlikeImg} alt="Unlike" />
        </div>
        <div className="text-sm leading-[1.7142857] text-slate-600">
          {unlike}
        </div>
      </div>
    </div>
  );
};

export default LikeUnlike;
