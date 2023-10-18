import React from "react";
import "./ArticleItem.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const ArticleItem = ({ title, description, liked, likePost }) => {
  const isLiked = liked ? "crimson" : "lightgrey";

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        <button onClick={likePost}>
          <FavoriteIcon style={{ fill: isLiked }} />
        </button>
        {liked}
      </div>
    </div>
  );
};
