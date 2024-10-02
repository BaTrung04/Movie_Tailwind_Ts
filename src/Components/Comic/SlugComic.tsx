import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getComic } from "../../services/apiServices";
import { IoChevronForwardOutline, IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import { TbCategory2 } from "react-icons/tb";
import { FaList } from "react-icons/fa";

interface Data {
  name: string;
  updatedAt: string;
  thumb_url: string;
  slug: string;
  author: string;
}

interface ServerData {
  chapter_api_data: string;
  chapter_name: number;
  filename: string;
}

interface Chap {
  server_data: ServerData[];
  server_name: string;
}

interface Category {
  name: string;
}

const SlugComic = () => {
  const location = useLocation();
  const { slug } = location.state || { slug: null };
  const [data, setData] = useState<Data[]>([]);
  const [chap, setChap] = useState<Chap[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getComic(slug);
        setData(res.data.item);
        setCategory(res.data.item.category);
        setChap(res.data.item.chapters[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [slug]);

  console.log(data);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const handleClickHome =
    (path: string) =>
    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      event.preventDefault();
      navigate(`${path}`);
    };
  const handleClickCategories = (slug: string) => {
    console.log(slug);
    navigate(`/the-loai/${slug}`, { state: { slug: slug } });
  };
  const handleClickReadComic = (chap: {
    filename: string;
    chapter_name: string;
    chapter_title: string;
    chapter_api_data: string;
  }) => {
    navigate(`/detail`, { state: { chap: chap } });
  };
  return (
    <>
      <div>
        <div
          className="flex items-center pt-[15px] cursor-pointer"
          onClick={handleClickHome("/")}
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
        <h1 className="flex items-center justify-center text-[15px] lg:text-[25px] py-[5px] uppercase font-bold">
          {data.name}
        </h1>
        <div className="text-[12px] lg:text-[15px] text-center italic">
          [Cập nhật: {formatDateTime(data.updatedAt)}]
        </div>
        <div className="lg:flex m-[20px] gap-[20px]">
          <img
            src={`${import.meta.env.VITE_IMG_URL}${data.thumb_url}`}
            alt={data.slug}
            className=" flex-[3.5] rounded-md m-auto h-[240px] lg:h-auto"
          />
          <div className="flex-[6.5] ">
            <div className="flex text-gray-500 lg:text-[20px] mb-[10px] mt-[5px] lg:mt-0">
              <FaUser className="top-[3px] relative" />
              <span>
                Tác giả: <span className=""></span> {data.author}
              </span>
            </div>
            <div className="flex text-gray-500 lg:text-[20px] mb-[10px]">
              <HiStatusOnline className="top-[3px] relative" />
              <span>Tình trạng: {data.status}</span>
            </div>
            <div className="flex text-gray-500 lg:text-[20px] mb-[10px]">
              <TbCategory2 className="top-[3px] relative" />
              <span>
                Thể loại:
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 auto-rows-auto gap-[10px] mt-[5px]">
                  {category &&
                    category.map((item) => {
                      return (
                        <div
                          className="lg:text-[20px] bg-blue-100  rounded-md lg:p-[7px] xl:p-[10px] hover:bg-[#7dd3fc] hover:text-white cursor-pointer overflow-hidden "
                          onClick={() => handleClickCategories(item.slug)}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                </div>
              </span>
            </div>
            <div className="flex items-center justify-center mt-[30px]">
              <button
                className="bg-yellow-400 text-white p-[7px] lg:px-[15px] lg:py-[10px] rounded-lg shadow-sm hover:shadow-md mr-[20px] hover:bg-amber-600"
                onClick={() => handleClickReadComic(chap.server_data[0])}
              >
                Đọc từ đầu
              </button>
              <button
                className="bg-yellow-400 text-white p-[7px] lg:px-[15px] lg:py-[10px]  rounded-lg shadow-sm hover:shadow-md hover:bg-amber-600"
                onClick={
                  () =>
                    handleClickReadComic(
                      chap.server_data[chap.server_data.length - 1]
                    ) // Lấy tập cuối cùng
                }
              >
                Đọc tập mới nhất
              </button>
            </div>
          </div>
        </div>
        <h1 className="lg:text-[20px] mx-[20px]">
          Nội dung truyện: {data.name}
        </h1>
        <p className="text-[14px] lg:text-[18px] ml-[20px] text-gray-600">
          Chào mừng độc giả thân mến của Truyen, {data.name} là bộ truyện tranh
          hấp dẫn mà NetTruyen muốn mang đến cho các bạn. Đây là bộ truyện tranh
          nằm trong thể loại{" "}
          {category &&
            category.map((item) => {
              return <> {item.name}, </>;
            })}
          trên website của chúng tôi.
        </p>
      </div>
      <div className="mx-[20px]">
        <div className="flex border-b-[3px] border-b-blue-700">
          <FaList className="top-[6px] relative" />
          <span className="text-[20px] ml-[5px]">Danh sách các tập</span>
        </div>
        <div className="mt-[10px] rounded-md border p-[10px]">
          {chap.server_data &&
            chap.server_data.map((chap) => {
              return (
                <>
                  <div
                    className="text-[13px] lg:text-[18px] flex justify-between border-b-[1px] border-dotted gap-[5px] py-[5px]  cursor-pointer hover:text-blue-700 hover:text-[19px]"
                    onClick={() => handleClickReadComic(chap)}
                  >
                    <div>Chap: {chap.chapter_name}</div>
                    <div>{chap.filename}</div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SlugComic;
