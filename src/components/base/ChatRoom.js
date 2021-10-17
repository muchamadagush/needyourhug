import FooterChat from "./FooterChat";
import HeaderChat from "./HeaderChat";
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatRoom = ({ data, onChange, onClick, chat, message, actionClick, handleSetSelected }) => {
  return (
    <>
      <HeaderChat username={data.name} avatar={data.avatar} actionClick={actionClick} handleSetSelected={handleSetSelected} />
      <ScrollToBottom className={`message-body overflow-y-auto py-2`}>
        {chat &&
          chat.map((item) => (
            <li
              className={`list-none w-max px-2 mx-4 my-1 rounded-lg text-white bottom-0  ${item.receiver !== data.id
                  ? "p-1 bg-gray-600"
                  : "p-1 ml-auto bg-blue-600"
                }`}
            >
              {item.message}<span className="text-xs ml-4">{item.createdAt}</span>
            </li>
          ))}
      </ScrollToBottom>
      <FooterChat onChange={onChange} onClick={onClick} message={message} />
    </>
  );
};

export default ChatRoom;
