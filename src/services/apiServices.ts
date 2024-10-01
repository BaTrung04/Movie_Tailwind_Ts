import axiosAPI from "./axiosBaseApi";

export const getHome = async () => {
  return await axiosAPI.get("https://otruyenapi.com/v1/api/home");
};

export const getList = async (type: string, page: number) => {
  return await axiosAPI.get(`/danh-sach/${type}?page=${page}`);
};

export const getCategories = async () => {
  return await axiosAPI.get("/the-loai");
};

export const getCategoriesBySlug = async (slug: string, page: number) => {
  return await axiosAPI.get(`/the-loai/${slug}?page=${page}`);
};
export const getComic = async (slug: string) => {
  return await axiosAPI.get(`/truyen-tranh/tu-vong-quan-chu/${slug}`);
};
export const getSearch = async (keyword: string) => {
  return await axiosAPI.get(`/tim-kiem?keyword=${keyword}`);
};
