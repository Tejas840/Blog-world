import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "./Spinner";

const DailyBlogs = ({ data, handleDelete, user }) => {
  return (
    <>
      {data != [] ? (
        <div className="dailyBlogs">
          <div className="title">
            <h3>Daily Blogs</h3>
          </div>
          <div className="blogs">
            {data.map((item, i) => {
              const {
                id,
                auther,
                category,
                description,
                imgurl,
                tags,
                timestamp,
                title,
                userId,
              } = item;
              return (
                <div key={id} className="blogCard flex">
                  <div className="image flex">
                    <div className="con flex">
                      <img className="img" src={imgurl} alt={title} />
                    </div>
                  </div>
                  <div className="info">
                    <div className="con flex">
                      <div className="div">
                        <p className="category">{category}</p>
                        <h3 className="subTitle">{title}</h3>
                        <div className="auther flex">
                          <p className="aut">{auther}</p>
                          <p>-</p>
                          <p>{timestamp.toDate().toDateString()}</p>
                        </div>
                        <p className="description">
                          {description.slice(0, 130) + "......."}
                        </p>
                      </div>
                      <div className="buttons flex">
                        <Link to={`/detail/${id}`}>
                          <button className="btn">Read More</button>
                        </Link>
                        {user && user.uid == userId ? (
                          <div className="flex">
                            <Link to={`/update/${id}`}>
                              <MdEditDocument className="iconEdit" />
                            </Link>

                            <AiFillDelete
                              onClick={() => handleDelete(id)}
                              className="iconEdit2"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default DailyBlogs;
