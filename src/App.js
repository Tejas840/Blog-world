import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Detail from "./pages/Detail";
import Auth from "./pages/Auth";
import AddEditBlog from "./pages/AddEditBlog";
import Error from "./pages/Error";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  function handleSignOut() {
    signOut(auth).then(() => {
      setUser(null);
      setActive("home");
      navigate("/");
    });
  }

  //
  return (
    <div>
      <Header
        active={active}
        signOut={handleSignOut}
        setActive={setActive}
        user={user}
      />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail setActive={setActive} />} />
        <Route path="/login" element={<Auth setActive={setActive} />} />
        <Route
          path="/update/:id"
          element={<AddEditBlog setActive={setActive} user={user} />}
        />
        <Route
          path="/create"
          element={<AddEditBlog setActive={setActive} user={user} />}
        />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </div>
  );
}

export default App;
