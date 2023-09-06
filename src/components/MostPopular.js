import React from "react";
import { Link } from "react-router-dom";

const MostPopular = ({ blogs }) => {
  console.log("most pupolar");
  console.log(blogs);
  return (
    <div className="mostPopular">
      <div className="title">
        <h3>Most Popular</h3>
      </div>
      <div className="list flex">
        {blogs.map((item) => {
          const {
            auther,
            category,
            description,
            id,
            imgurl,
            title,
            timestamp,
          } = item;
          return (
            <Link className="link" to={`/detail/${id}`}>
              <div className="card flex">
                <div className="image">
                  <img src={imgurl} alt="" />
                </div>
                <div className="info">
                  <p className="name">{title}</p>
                  <p className="date">{timestamp.toDate().toDateString()}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MostPopular;
