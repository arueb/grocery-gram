import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Like = ({ liked, onClick }) => {
  //   let classes = "fa fa-heart";
  //   if (!liked) classes += "-o";
  if (liked)
    return (
      <FaHeart
        onClick={onClick}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      />
    );
  return (
    <FaRegHeart
      onClick={onClick}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  );
  //   return (
  //     <i
  //       className={classes}
  //       aria-hidden="true"
  //       onClick={onClick}
  //       style={{ cursor: "pointer" }}
  //     ></i>
  //   );
};

export default Like;
