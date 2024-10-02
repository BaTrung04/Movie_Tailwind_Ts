import logo from "../../assets/logo.svg";
interface Data {
  name: string;
  id: number;
}
const Footer = () => {
  const data: Data[] = [
    { name: "Naruto", id: 1 },
    { name: "One Piece", id: 2 },
    { name: "Bleach", id: 3 },
    { name: "Dragon Ball", id: 4 },
    { name: "Attack on Titan", id: 5 },
    { name: "My Hero Academia", id: 6 },
    { name: "Demon Slayer", id: 7 },
    { name: "Hunter x Hunter", id: 8 },
    { name: "Fairy Tail", id: 9 },
    { name: "Black Clover", id: 10 },
    { name: "Tokyo Ghoul", id: 11 },
    { name: "Sword Art Online", id: 12 },
    { name: "Death Note", id: 13 },
    { name: "Fullmetal Alchemist", id: 14 },
    { name: "One Punch Man", id: 15 },
    { name: "Blue Exorcist", id: 16 },
    { name: "Seven Deadly Sins", id: 17 },
    { name: "Haikyuu!!", id: 18 },
    { name: "JoJo's Bizarre Adventure", id: 19 },
    { name: "Mob Psycho 100", id: 20 },
    { name: "Re:Zero", id: 21 },
    { name: "Fate/Stay Night", id: 22 },
    { name: "Boruto", id: 23 },
    { name: "Gintama", id: 24 },
    { name: "Shokugeki no Soma", id: 25 },
    { name: "Noragami", id: 26 },
    { name: "Akame ga Kill!", id: 27 },
    { name: "Kuroko no Basket", id: 28 },
    { name: "Yuri on Ice", id: 29 },
    { name: "Dr. Stone", id: 30 },
  ];
  return (
    <>
      <div className="bg-sky-300">
        <div className="container flex p-0 ">
          <div className="flex gap-[20px] pt-[15px]">
            <div className="flex-[4] ">
              <img
                src={logo}
                alt=""
                className="w-[150px] relative top-[-7px] cursor-pointer"
              />
              <div className="ml-[20px]  ">
                <div className="mb-[5px]">
                  <span>Giới thiệu </span>|<span> Liên hệ</span>
                </div>
                <div className="mb-[5px]">
                  <span>Điều Khoản </span>|<span> Chính Sách Bảo Mật</span>
                </div>
                <div className="mb-[5px]">Copyright © 2024 Truyen</div>
                <div className="text-[20px]">Miễn trừ trách nhiệm</div>
                <p className="mb-[5px] ">
                  Trang web này cung cấp nội dung truyện tranh chỉ với mục đích
                  giải trí và không chịu trách nhiệm về bất kỳ nội dung quảng
                  cáo, liên kết của bên thứ ba hiển thị trên trang web của chúng
                  tôi.
                </p>
                <p className="mb-[5px] ">
                  Tất cả thông tin và hình ảnh trên website đều được thu thập từ
                  internet. Chúng tôi không chịu trách nhiệm về bất kỳ nội dung
                  nào. Nếu bạn hoặc tổ chức của bạn có vấn đề gì liên quan đến
                  nội dung hiển thị trên website, vui lòng liên hệ với chúng tôi
                  để được giải quyết.
                </p>
              </div>
            </div>
            <div className="flex-[6]">
              <div className="text-[25px] font-bold text-white">Từ khóa</div>

              <div>
                {data.map((item) => {
                  return (
                    <button
                      className=" text-blue p-[7px] lg:px-[15px] lg:py-[10px] rounded-lg shadow-2xl hover:shadow-md mr-[20px] hover:bg-amber-300"
                      key={item.id}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
