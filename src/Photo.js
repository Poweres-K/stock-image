import React, { memo } from "react";

const Photo = ({ imageDetails }) => {
  const { regular, alt_description, name, likes, portfolio_url, medium } =
    imageDetails;

  return (
    <article className="photo">
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt="Error" className="user-img" />
        </a>
      </div>
    </article>
  );
};

export default memo(Photo);
