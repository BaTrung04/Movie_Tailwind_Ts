import React, { useEffect, useState } from "react";
import { getHome } from "../../services/apiServices";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Data {
  _id: string;
  name: string;
  thumb_url: string;
  status: string;
  slug: string;
  updatedAt: string;
}
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 7,
  },
  medium: {
    breakpoint: { max: 1324, min: 1000 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1000, min: 800 },
    items: 4,
  },
  large: {
    breakpoint: { max: 800, min: 500 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 2,
  },
};
const CarouselHome: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getHome();
        setData(res.data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className="container p-0 py-[15px] px-[3px]">
      <Carousel
        responsive={responsive}
        showDots={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all 1s ease-in-out"
        transitionDuration={500}
        className="rounded-sm"
      >
        {data &&
          data.map((urlImg, index) => (
            <div key={index}>
              <img
                src={`${import.meta.env.VITE_IMG_URL}${urlImg.thumb_url}`}
                alt=""
                className="h-[320px] cursor-pointer"
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselHome;
