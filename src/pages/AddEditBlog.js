import React, { useEffect, useState } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  imgurl: "",
};
const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Business",
];
const AddEditBlog = ({ user, setActive }) => {
  const blogId = useParams();
  console.log(blogId);

  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const { title, tags, trending, category, description, imgurl } = form;

  useEffect(() => {
    const uploadFile = () => {
      const toastLoad = toast.loading("uploading...");
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadPercent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is" + uploadPercent + "% done");
          setProgress(uploadPercent);

          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          toast.update(toastLoad, {
            render: "uploaded",
            type: "success",
            isLoading: false,
            autoClose: 500,
          });
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, imgurl: downloadUrl }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  useEffect(() => {
    if (blogId.id) {
      getBlogDetail();
      setActive(null);
    }
  }, [blogId]);

  const getBlogDetail = async () => {
    const { id } = blogId;
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && imgurl && tags && trending && category && description) {
      if (!blogId.id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            auther: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created sucessfully");
          navigate("/");
          setActive("home");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        try {
          const { id } = blogId;
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            auther: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated sucessfully");
          navigate("/");
          setActive("home");
        } catch (error) {
          toast.error(error.message);
        }
      }
    } else {
      toast.error("You need fill up all required fields");
    }
  };

  // Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam error animi exercitationem aut. Dolores consequatur cumque laudantium quam perspiciatis. Dolores quos pariatur dolorum quod corrupti ea id odit distinctio? Blanditiis maiores optio eligendi dolorem voluptatem ea exercitationem? Quia rerum pariatur commodi at. Excepturi maiores libero magni veritatis voluptates molestias unde ratione sunt minima non alias illum modi temporibus officiis delectus vel, dolor quae adipisci sit nostrum assumenda ea sint autem! Totam explicabo natus perferendis maiores, iusto ad, iste laborum, quo eaque recusandae fugit in corporis deserunt tenetur repudiandae! Fugit omnis obcaecati deleniti minima et officia eveniet, ullam aut facere pariatur velit corrupti repellendus magni soluta earum explicabo qui! Iste libero esse dolores impedit blanditiis, explicabo soluta eveniet ea voluptatum reiciendis quidem, vel voluptatem corporis, inventore tenetur voluptatibus odit. Iure labore molestiae praesentium dolorem obcaecati quasi, quidem consequuntur magni pariatur eveniet, libero voluptatem autem, reiciendis ipsum fuga nam inventore. Facilis possimus nostrum cupiditate hic. Nisi quam ducimus odio similique odit consequuntur dignissimos doloribus ipsa culpa! Quas, quis aspernatur reprehenderit eveniet sit facere praesentium iusto hic dolores. Asperiores velit perferendis dolorem in iste vitae consequuntur sit itaque animi. Recusandae error repellat accusamus libero explicabo, distinctio illo impedit! Deserunt quam quisquam repudiandae in natus, corporis ad, dolores nesciunt veritatis beatae soluta excepturi non? Aspernatur, eligendi quibusdam. Nisi ullam minus quos magni numquam voluptate illum sed ab aperiam enim totam, repellat, repudiandae quam perferendis iste soluta similique tempora ex quis ipsam vitae nostrum. Eius, error distinctio explicabo molestias id itaque cum iste enim sint expedita, dicta quis. Minus, optio. Nulla, minus recusandae? A aliquam necessitatibus atque maiores aperiam ullam laborum voluptatum molestias tempore voluptate? Culpa placeat ab ipsam perferendis cumque sint nesciunt fugiat expedita possimus, a eaque ex dicta ipsa laborum excepturi fuga unde quo, consequatur neque id facilis eos modi iure! A aut beatae ad labore atque inventore velit debitis minima? Rerum quaerat quod, reprehenderit suscipit corrupti amet sed voluptates magni qui ipsam esse incidunt recusandae eveniet quasi sit maxime quae vel ea quas delectus tenetur similique officiis quia nemo. Voluptatibus culpa laudantium explicabo dolorem beatae velit ratione non officia ipsum sit quisquam repudiandae vero fugiat blanditiis ut voluptates minus laboriosam, illum nesciunt dolore, error molestias magnam, aperiam id! Assumenda velit quae eaque earum aut ut sapiente adipisci, cupiditate hic aspernatur nihil expedita facilis laborum debitis doloremque, placeat, necessitatibus ipsam minima dolores dignissimos reiciendis qui. Odio sapiente illum asperiores quos nihil delectus cum.
  return (
    <div className="editBlog">
      <div className="container">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <h3>Create Blog</h3>
            <input
              className="input"
              name="title"
              onChange={(e) => handleChange(e)}
              placeholder="Title"
              value={title}
              type="title"
            />
            <div className="tag">
              <ReactTagInput
                tags={tags}
                placeholder="Tags"
                onChange={handleTags}
              />
            </div>
            <div className="trend flex">
              <p>Is it trending blog ?</p>
              <div>
                <input
                  type="radio"
                  className="checkInput"
                  value={"yes"}
                  name="trending"
                  checked={trending == "yes"}
                  onChange={handleChange}
                />
                <label htmlFor="radioOption">Yes&nbsp;</label>
                <input
                  type="radio"
                  className="checkInput"
                  value={"no"}
                  name="trending"
                  checked={trending == "no"}
                  onChange={handleChange}
                />
                <label htmlFor="radioOption">No&nbsp;</label>
              </div>
            </div>
            <div>
              <select
                value={category}
                onChange={handleChange}
                name="category"
                className="selectBar input"
              >
                <option>Please select category</option>
                {categoryOption.map((val, i) => {
                  return (
                    <option value={val || ""} key={i}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="desc">
              <div>
                <textarea
                  placeholder="Description"
                  value={description}
                  name="description"
                  // cols="100%"
                  rows="10"
                  className="textArea"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="button">
              <button
                className="btn"
                disabled={progress != null && progress < 100}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
