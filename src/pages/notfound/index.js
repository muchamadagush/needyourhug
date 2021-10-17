import { useEffect } from "react"
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory()
  useEffect(() => {
    setTimeout(() => {
      history.push('/')
    }, 5000);
  }, [history])

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-3">
      <h1 className="text-black font-bold text-4xl">404 | page not found</h1>
      <button onClick={() => history.push('/')} className="bg-indigo-400 py-3 px-6 rounded-md text-xl text-white hover:outline-none hover:bg-indigo-500">Back to home</button>
    </div>
  )
}

export default NotFound
