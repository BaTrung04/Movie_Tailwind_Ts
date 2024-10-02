import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import NavBar from "./Components/Navbar/NavBar";
import NewStory from "./Components/NewStory/NewStory";
import Releasing from "./Components/Releasing/Releasing";
import ComingSoon from "./Components/ComingSoon/ComingSoon";
import Complete from "./Components/Complete/Complete";
import { useEffect, useState } from "react";
import CarouselHome from "./Components/Carousel/CarouselHome";
import HomePage from "./Components/Home/HomePage";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

function App() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });
  const [isMobile, setMobile] = useState<boolean>(false);

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
          <NavBar isMobile={isMobile} />
          <CarouselHome />
          <div className="">
            <Routes>
              <Route path="/" element={<Home />}>
                <Route index element={<HomePage />} />
                <Route path="/truyen-moi" element={<NewStory />} />
                <Route path="/sap-ra-mat" element={<Releasing />} />
                <Route path="/dang-phat-hanh" element={<ComingSoon />} />
                <Route path="/hoan-thanh" element={<Complete />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
