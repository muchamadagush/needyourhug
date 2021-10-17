import PopOver from "./PopOver";
import People from "../../assets/man.png";
import Back from "../../assets/back.png";

const HeaderChat = ({
  avatar,
  username,
  status,
  actionClick,
  handleSetSelected,
}) => {
  return (
    <div className="flex h-24 bg-white items-center px-8">
      <img
        src={Back}
        alt="back"
        className={`block md:hidden lg:hidden mr-4`}
        onClick={handleSetSelected}
      />
      <div className="h-12 w-12 object-contain">
        <img
          src={
            avatar
              ? `${process.env.REACT_APP_VERCEL_URL}files/${avatar}`
              : People
          }
          alt="profile"
          className="w-12 h-12 rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col ml-4">
        <p className="font-medium text-lg">{username}</p>
        <span className="text-sm font-normal text-indigo-400">{status}</span>
      </div>
      <PopOver actionClick={actionClick} />
    </div>
  );
};

export default HeaderChat;
