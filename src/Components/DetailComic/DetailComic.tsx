import { useEffect, useState } from "react";
import { IoChevronForwardOutline, IoHome } from "react-icons/io5";
import { useLocation } from "react-router-dom";

interface Data {
  chapter_image: DataImg[];
  chapter_name: number;
  comic_name: string;
  _id: string;
  chapter_path: string;
}
interface DataImg {
  image_file: string;
  image_page: number;
}
const DetailComic = () => {
  const location = useLocation();
  const { chap } = location.state || { chap: {} };
  const [data, setData] = useState<Data[]>([]);
  const [dataImg, setDataImg] = useState<DataImg[]>([]);
  const [showSticky, setShowSticky] = useState<boolean>(false);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(chap.chapter_api_data);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setData(data.data.item);
        setDataImg(data.data.item.chapter_image);
      } catch (err) {
        console.log(err);
      }
    };
    if (chap.chapter_api_data) {
      fetchApi();
    }
  }, [chap.chapter_api_data]);
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
  return (
    <>
      <div className="container p-0 bg-white">
        <div
          className="flex items-center pt-[15px] cursor-pointer"
          // onClick={handleClickHome("/")}
        >
          <h1 className=" text-blue-400 text-[22px] underline  ml-[15px]">
            <IoHome />
          </h1>
          <h1 className=" text-blue-400 text-[22px] underline  ">
            <IoChevronForwardOutline />
          </h1>
          <h1 className=" text-blue-400 text-[22px] underline  ">
            Về Trang chủ
          </h1>
        </div>
        <div className="px-[15px] lg:text-[30px]">
          <span className="text-blue-400 hover:underline hover:text-blue-600 cursor-pointer">
            {chap.filename}
          </span>{" "}
          -<span>Chap:{chap.chapter_name}</span>
        </div>

        <div className="bg-slate-100 flex flex-col items-center gap-[5px] py-[15px]">
          <p className=" lg:text-[20px]">
            Nếu không xem được truyện vui lòng đổi{" "}
            <span className="text-blue-500 cursor-pointer hover:underline hover:text-purple-600">
              "SERVER ẢNH"
            </span>{" "}
            bên dưới
          </p>
          <p className="text-red-500 lg:text-[20px]">
            Vui lòng bấm{" "}
            <span className="hover:underline cursor-pointer">"BÁO LỖI"</span>{" "}
            nếu không xem được truyện
          </p>
          <div>
            <button className="bg-green-400 text-white p-[7px] lg:px-[15px] lg:py-[10px] rounded-lg shadow-sm hover:shadow-md mr-[20px] hover:bg-amber-600">
              Server 1
            </button>
            <button className="bg-blue-400 text-white p-[7px] lg:px-[15px] lg:py-[10px] rounded-lg shadow-sm hover:shadow-md mr-[20px] hover:bg-amber-600">
              Server 2
            </button>
          </div>
          <button className="bg-yellow-400 text-white p-[7px] lg:px-[15px] lg:py-[10px] rounded-lg shadow-sm hover:shadow-md mr-[20px] hover:bg-amber-600">
            Báo lỗi
          </button>
        </div>
        {dataImg &&
          dataImg.map((img) => {
            return (
              <>
                <div className="flex items-center justify-center">
                  <img
                    src={`${import.meta.env.VITE_IMG_CHAP_URL}${
                      data.chapter_path
                    }/${img.image_file}`}
                    alt={img.image_page}
                    key={img.image_page}
                  />
                </div>
              </>
            );
          })}
      </div>
      {showSticky && (
        <div className="sticky w-[100%] bg-slate-400 bottom-0 h-[60px]">
          <div className="container p-0">
            <div className="flex items-center justify-center py-[5px] gap-[5px]">
              <IoHome size={37} color="#fff" />
              <button className="join-item btn text-[30px]">«</button>
              <button className="join-item btn">Page 22</button>
              <button className="join-item btn text-[30px]">»</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailComic;
