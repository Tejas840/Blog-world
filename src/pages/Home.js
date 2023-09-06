import React, { useEffect, useState } from "react";
import DailyBlogs from "../components/DailyBlogs";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
import Carousel from "../components/Carousel";

const Home = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.map((item) => {
          tags.push(item.get("tags"));
          list.push({ id: item.id, ...item.data() });
        });
        let newTags = [];
        tags.map((list) => {
          list.map((item) => {
            newTags.push(item);
          });
        });

        const uniqueTags = [...new Set(newTags)];
        setTags(uniqueTags);
        setData(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="home">
      <div className="container">
        <div className="trending">
          <div className="title">
            <h3>Trending</h3>
          </div>
          <div className="container2">
            <Carousel data={data} />
          </div>
        </div>
        <div className="blogs flex">
          <div className="dailyBlog">
            <DailyBlogs user={user} handleDelete={handleDelete} data={data} />
          </div>
          <div className="tags">
            <Tags tags={tags} />
            <MostPopular blogs={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
