import React from "react";

const Tags = ({ tags }) => {
  return (
    <div className="tags">
      <div className="title">
        <h3>Tags</h3>
      </div>
      <div className="tagList flex">
        {tags.map((item, i) => {
          return (
            <p key={i} className="tag">
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
