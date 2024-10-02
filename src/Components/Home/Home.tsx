import { useEffect, useState } from "react";
import { getCategories } from "../../services/apiServices";

import { Outlet } from "react-router-dom";
import CarouselHome from "../Carousel/CarouselHome";

interface Categories {
  _id: string;
  slug: string;
  name: string;
}

const Home = () => {
  const [DataCategories, setDataCategories] = useState<Categories[]>([]);

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
                  >
                    {categories.name}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
