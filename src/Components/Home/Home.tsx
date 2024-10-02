import { useEffect, useState } from "react";
import { getCategories } from "../../services/apiServices";

import { Outlet, useNavigate } from "react-router-dom";
import CarouselHome from "../Carousel/CarouselHome";
import { AiOutlineUpload } from "react-icons/ai";
interface Categories {
  _id: string;
  slug: string;
  name: string;
}

const Home = () => {
  const [DataCategories, setDataCategories] = useState<Categories[]>([]);
  const navigate = useNavigate();
  const [showSticky, setShowSticky] = useState<boolean>(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getCategories();
        setDataCategories(res.data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup để xóa sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickCategories = (slug: string) => {
    navigate(`/the-loai/${slug}`, { state: { slug: slug } });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // cuộn mượt mà
    });
  };
  return (
    <>
      <CarouselHome />
      <div className="container flex p-0 bg-white">
        {/* left */}
        <div className="flex-[7.5]">
          <Outlet />
        </div>
        <div className="flex-[2.5]  mt-[48px] ml-[10px] rounded-md shadow-md h-auto">
          <div className="grid grid-cols-1 grid-rows-20 lg:grid-cols-2 lg:grid-rows-10 gap-2 m-[10px]">
            {DataCategories &&
              DataCategories.map((categories) => {
                return (
                  <div
                    key={categories._id}
                    className="text-[14px] bg-blue-100  rounded-md p-[7px] xl:p-[10px] hover:bg-[#7dd3fc] hover:text-white cursor-pointer overflow-hidden"
                    onClick={() => handleClickCategories(categories.slug)}
                  >
                    {categories.name}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {showSticky && (
        <div
          className="fixed  bg-slate-400 bottom-[30px] right-[30px] w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] flex items-center justify-center rounded-[999px] cursor-pointer hover:bg-red-200"
          onClick={scrollToTop}
        >
          <AiOutlineUpload size={30} />
        </div>
      )}
    </>
  );
};

export default Home;
