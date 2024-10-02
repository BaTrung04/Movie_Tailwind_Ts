import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import NewStory from "./Components/NewStory/NewStory";
import Releasing from "./Components/Releasing/Releasing";
import ComingSoon from "./Components/ComingSoon/ComingSoon";
import Complete from "./Components/Complete/Complete";
import HomePage from "./Components/Home/HomePage";
import Search from "./Components/Search/Search";
import SlugComic from "./Components/Comic/SlugComic";
import NavBar from "./Components/Navbar/NavBar";
import { useEffect, useState } from "react";
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}
function App() {
  const [isMobile, setMobile] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }, []);
  useEffect(() => {
    if (windowSize.width && windowSize.width < 800) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);
  return (
    <>
      <Router>
        <div>
          <div className="">
            <NavBar isMobile={isMobile} />
            <Routes>
              <Route path="/" element={<Home />}>
                <Route index element={<HomePage />} />
                <Route path="/truyen-moi" element={<NewStory />} />
                <Route path="/sap-ra-mat" element={<Releasing />} />
                <Route path="/dang-phat-hanh" element={<ComingSoon />} />
                <Route path="/hoan-thanh" element={<Complete />} />
                <Route path="/search" element={<Search />} />
              </Route>
              <Route path="/Slug" element={<SlugComic />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
