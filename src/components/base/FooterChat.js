import InputChat from "./InputChat"

const FooterChat = ({ onChange, onClick, message }) => {
  return (
    <footer className="h-24 flex justify-center items-center bottom-0 bg-white px-8">
      <InputChat onChange={onChange} onClick={onClick} message={message} />
    </footer>
  )
}

export default FooterChat
