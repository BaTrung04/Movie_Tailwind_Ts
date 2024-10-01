import { useEffect, useState } from "react";
import { getHome } from "../../services/apiServices";
const Home = () => {
  const [data, setData] = useState<string>("");
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getHome();
        console.log(res.data);
        setData(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);
  // console.log(data);
  return <>home</>;
};

export default Home;
