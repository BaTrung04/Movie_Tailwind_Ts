import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import { getList } from "../../services/apiServices";
import { useLocation, useNavigate } from "react-router-dom";
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

const Releasing = () => {
  const [data, setData] = useState<Data>({ type_list: "" });
  const [dataComic, setDataComic] = useState<Comic[]>([]);
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const { slug } = location.state || { slug: null };
  const [perPage, setPerPage] = useState<number>(1);
  console.log(slug);
  const type = slug;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getList(type, page);
        setData(res.data);
        setPerPage(res.data.params.pagination.currentPage);
        setDataComic(res.data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [page]);
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
  return (
    <>
      <div className="flex items-center pt-[15px] cursor-pointer">
        <h1
          className=" text-blue-400 text-[22px] underline  ml-[15px]"
          onClick={handleClickHome("/")}
        >
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
      <div className="h-auto flex items-center justify-center pb-[15px]">
        <div className="join">
          {page > 1 && (
            <button className="join-item btn" onClick={() => setPage(page - 1)}>
              «
            </button>
          )}

          <button
            className={`join-item btn ${
              page === 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setPage(1)}
          >
            1
          </button>

          {page > 2 && (
            <button
              className={`join-item btn `}
              onClick={() => setPage(page - 1)}
            >
              {page - 1}
            </button>
          )}

          {page > 1 && (
            <button
              className={`join-item btn ${
                page === page ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setPage(page)}
            >
              {page}
            </button>
          )}

          <button
            className={`join-item btn `}
            onClick={() => setPage(page + 1)}
          >
            {page + 1}
          </button>

          {page > 10 && <button className="join-item btn">....</button>}

          {perPage < 18 && (
            <button className="join-item btn" onClick={() => setPage(page + 1)}>
              »
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Releasing;
