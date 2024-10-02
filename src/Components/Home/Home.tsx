import { useEffect, useState } from "react";
import { getCategories, getHome } from "../../services/apiServices";
import { IoHome } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";

interface Comic {
  _id: string;
  name: string;
  thumb_url: string;
  status: string;
  slug: string;
  updatedAt: string;
}
interface Data {
  type_list: string;
}
interface Categories {
  _id: string;
  slug: string;
  name: string;
}

const Home = () => {
  const [data, setData] = useState<Data>({ type_list: "" });
  const [dataComic, setDataComic] = useState<Comic[]>([]);
  const [DataCategories, setDataCategories] = useState<Categories[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getHome();
        console.log(res.data);
        setData(res.data);
        setDataComic(res.data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);
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
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Định dạng ngày giờ cục bộ
  };
  // console.log(data);
  // console.log(dataComic);
  console.log(DataCategories);
  return (
    <>
      <div className="container flex p-0 bg-white">
        <div className="flex-[7.5]">
          <div className="flex items-center pt-[15px] cursor-pointer">
            <h1 className=" text-blue-400 text-[22px] underline  ml-[15px]">
              <IoHome />
            </h1>
            <h1 className=" text-blue-400 text-[22px] underline  ">
              <IoChevronForwardOutline />
            </h1>
            <h1 className=" text-blue-400 text-[22px] underline  ">
              {data.type_list}
            </h1>
          </div>
          <div className="grid grid-cols-2 auto-rows-auto lg:grid-cols-3 lg:auto-rows-auto xl:grid-cols-5 xl:auto-rows-auto gap-2 px-[5px] py-[15px] rounded-md">
            {dataComic &&
              dataComic.map((comic) => {
                return (
                  <div
                    key={comic._id}
                    className="h-[auto] shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-110  cursor-pointer mb-[10px] rounded-md relative"
                  >
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${comic.thumb_url}`}
                      alt=""
                      className="h-[240px] lg:h-[280px] w-[calc(100%-20px)] object-cover m-auto rounded-md "
                    />
                    <div className="text-[12px] lg:text-[13px] xl:text-[16px] absolute top-[7px] right-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md px-[5px]">
                      {comic.status}
                    </div>
                    <div className="text-[14px] py-[10px] text-center ">
                      {comic.name}
                    </div>
                    <div className="text-[12px] text-center">
                      Cập nhật: {formatDateTime(comic.updatedAt)}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex-[2.5]  mt-[48px] ml-[10px] rounded-md shadow-md h-auto">
          <div className="grid grid-cols-1 grid-rows-20 lg:grid-cols-2 lg:grid-rows-10 gap-2 m-[10px]">
            {DataCategories &&
              DataCategories.map((categories) => {
                return (
                  <div
                    key={categories._id}
                    className=" text-[14px] bg-blue-100  rounded-md p-[7px] xl:p-[10px] hover:bg-[#7dd3fc] cursor-pointer overflow-hidden"
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
