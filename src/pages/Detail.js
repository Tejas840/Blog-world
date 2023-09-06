import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";

const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [tag, setTag] = useState([]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  };

  if (blog) {
    var {
      auther,
      category,
      description,
      imgurl,
      tags,
      timestamp,
      title,
      userId,
    } = blog;
  }
  // console.log(timestamp.toDate().toDateString());

  //
  return (
    <div className="detail">
      <div className="img" style={{ backgroundImage: `url(${imgurl})` }}>
        <div className="title">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="info flex">
        <div className="des">
          <p className="title">By {auther}</p>
          <div className="des">
            <p>{description}</p>
          </div>
        </div>
        <div className="tagsCard">
          {tags && <Tags tags={tags} />}
          {/* <MostPopular /> */}
        </div>
      </div>
    </div>
  );
};

export default Detail;
