import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { getSearch } from "../../services/apiServices";

interface NavbarLink {
  id: number;
  title: string;
  slug: string;
}

interface NavBarProps {
  isMobile: boolean;
}
interface SearchResult {
  titlePage: string;
  items: [
    _id:string,
    
  ];
}
const NavBar: React.FC<NavBarProps> = ({ isMobile }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [dataSearch, setDataSearch] = useState<SearchResult[] | null>(null);
  const NavbarLinks: NavbarLink[] = [
    {
      id: 1,
      title: "Truyện Mới",
      slug: "truyen-moi",
    },
    {
      id: 2,
      title: "Sắp ra mắt",
      slug: "sap-ra-mat",
    },
    {
      id: 3,
      title: "Đang phát hành",
      slug: "dang-phat-hanh",
    },
    {
      id: 4,
      title: "Hoàn thành",
      slug: "hoan-thanh",
    },
  ];

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleClickHome =
    (path: string) =>
    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      event.preventDefault();
      navigate(`${path}`);
    };

  const handleClickPage =
    (slug: string) =>
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      console.log(slug);
      navigate(`${slug}`, { state: { slug } });
      setOpenMenu(false);
    };
  const handleSearch = async () => {
    if (keyword) {
      try {
        const res = await getSearch(keyword);
        setDataSearch(res.data);
        console.log(dataSearch);
        navigate("/search", { state: { dataSearch: res.data } });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
      setKeyword("");
    }
  };
  return (
    <div className="bg-sky-300  ">
      <nav className="container h-[120px] lg:flex lg:justify-between items-center lg:h-[60px] p-[5px] relative">
        <div className="items-center justify-between flex  lg:justify-start lg:w-[100%]">
          {/* Logo */}
          <img
            src={logo}
            alt=""
            className="w-[150px] relative top-[-7px] cursor-pointer "
            onClick={handleClickHome("/")}
          />
          {/* Thể loại */}
          {openMenu && isMobile ? (
            <MdOutlineClose
              size={"24px"}
              className="cursor-pointer w-[50px]"
              onClick={handleMenu}
            />
          ) : !openMenu && isMobile ? (
            <HiOutlineMenu
              size={"24px"}
              className="cursor-pointer w-[50px]"
              onClick={handleMenu}
            />
          ) : (
            <>
              <div className="">
                <ul className="flex gap-3 xl:gap-6">
                  {NavbarLinks.map((link) => {
                    return (
                      <li key={link.id}>
                        <a
                          href={link.slug}
                          className="hover:text-primary text-sm xl:text-base md:text-base cursor-pointer"
                          onClick={handleClickPage(link.slug)}
                        >
                          {link.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
          {openMenu && (
            <div className="absolute w-[100%] top-[120px] shadow-lg bg-white z-[500] text-13 ">
              <ul className="flex flex-col gap-1 content-start ">
                {NavbarLinks.map((link) => {
                  return (
                    <div
                      key={link.id}
                      className="px-[5px] py-[10px] border border-solid"
                    >
                      <a
                        href={link.slug}
                        className="hover:text-primary uppercase text-sm xl:text-base md:text-base cursor-pointer"
                        onClick={handleClickPage(link.slug)}
                      >
                        {link.title}
                      </a>
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        {/* Tìm kiếm */}
        <label className="input flex items-center gap-2 h-[40px]">
          <input
            type="text"
            className="grow"
            value={keyword}
            placeholder="Tìm truyện"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
            onClick={handleSearch}
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </nav>
    </div>
  );
};

export default NavBar;
