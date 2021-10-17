import Search from "../../components/base/search";
import ListMessage from "../../components/base/listMessage";
import { useEffect, useState } from "react";
import ChatRoom from "../../components/base/ChatRoom";
import io from "socket.io-client";
import backendApi from "../../configs/api/backendApi";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import People from "../../assets/man.png";
import Menu from "../../components/base/Menu";
import { getUser } from "../../configs/redux/actions/userActions";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Home = () => {
  const dispatch = useDispatch();
  const [selectedContact, setSelectedContact] = useState("");
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState([]);
  const [chats, setChats] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [phone, setPhone] = useState(false);
  const [username, setUsername] = useState(false);
  const [bio, setBio] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [userSelect, setUserSelect] = useState({});

  const setupSocket = () => {
    const resultSocket = io("https://telegram.muchamadagushermawan.online", {
      query: {
        token: localStorage.getItem("token"),
      },
    });
    setSocket(resultSocket);
  };

  useEffect(() => {
    dispatch(getUser());
    const token = localStorage.getItem("token");
    if (token && !socket) {
      setupSocket();
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.off("newMessage");
      socket.on("newMessage", (data) => {
        if (data.sender === selectedContact.id) {
          setChat((currentValue) => [...currentValue, data]);
        } else {
          toast.info("new message", { position: toast.POSITION.TOP_RIGHT });
          backendApi.get(`chats/${users.id}`, {
            headers:{
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((res) => {
            const data = res.data.chats
            setChats(data)
          })
        }
      });
    }
  }, [socket, selectedContact, users]);

  useEffect(() => {
    backendApi
      .get(`users?search=${query}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [query]);

  useEffect(() => {
    if (selectedContact) {
      backendApi
        .get(`chats/${selectedContact.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const result = res.data.chats;
          setChat(result);
        });

      backendApi
        .get(`users/user/${selectedContact.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const result = res.data.user[0];
          setUserSelect(result);
        });
    }
  }, [selectedContact]);

  const handleInput = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const sendMessage = () => {
    if (socket && message) {
      socket.emit(
        "sendMessage",
        {
          receiver: selectedContact.id,
          message: message,
        },
        (data) => {
          setChat((currentValue) => [
            ...currentValue,
            {
              receiver: data.receiver,
              message: data.message,
              createdAt: data.createdAt,
            },
          ]);
        }
      );
      setMessage("");
    }
  };

  const { profile } = useSelector((state) => state.user);
  const [dataUser, setDataUser] = useState({
    phone: profile.phone,
    username: profile.username,
    bio: profile.bio,
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  const updatePhone = () => {
    if (!dataUser.phone) {
      toast.error("Phone cannot be null", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const data = { phone: dataUser.phone };
      backendApi
        .patch(`users/phone`, data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setPhone(!phone);
          dispatch(getUser());
          toast.success("Phone successfully update!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  const updateUsername = () => {
    if (!dataUser.username) {
      toast.error("Username cannot be null", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const data = { username: `${dataUser.username}` };
      backendApi
        .patch(`users/username`, data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setUsername(!username);
          dispatch(getUser());
          toast.success("Username successfully update", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  const updateBio = () => {
    if (!dataUser.bio) {
      toast.error("Bio cannot be null", { position: toast.POSITION.TOP_RIGHT });
    } else {
      const data = { bio: dataUser.bio };
      backendApi
        .patch(`users/bio`, data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setBio(!bio);
          dispatch(getUser());
          toast.success("Bio successfully update", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  const handleChangeAvatar = (e) => {
    e.preventDefault();
    const files = document.querySelector('input[type="file"]').files[0];
    setImgPreview(URL.createObjectURL(files));
  };

  const handleUpdateAvatar = (e) => {
    e.preventDefault();
    const files = document.querySelector('input[type="file"]').files[0];
    const data = new FormData();
    data.append("avatar", files);

    backendApi
      .patch("users/avatar", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setImgPreview("");
        dispatch(getUser());
        toast.success("Avatar successfully update", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const confirm = (id) => {
    confirmAlert({
      title: 'Are you sure?',
      message: 'You want to delete this chat?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteHistoryChat(id)
        },
        {
          label: 'No',
          onClick: () => toast.error('Cancelled!', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      ]
    });
  }

  const handleDeleteHistoryChat = (id) => {
    backendApi.delete(`chats/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        backendApi
          .get(`chats/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            const result = res.data.chats;
            setChat(result);
            toast.success("Chat deleted!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
  }

  return (
    <>
      <ToastContainer draggable={false} transition={Zoom} autoClose={4000} />
      <div className="flex relative overflow-x-hidden">
        <div className={`h-screen bg-white w-screen ${selectedContact !== '' ? 'hidden' : 'block'} lg:block lg:w-1/4 px-5 border-r`}>
          <input
            id="my-drawer"
            type="checkbox"
            class="drawer-toggle"
            onClick={() => setSidebar(!sidebar)}
          />
          {sidebar === true ? (
            <>
              <div className="h-7">
                <div className="flex justify-start items-center mt-5 text-indigo-400">
                  <label for="my-drawer" class="drawer-button">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </label>

                  <h3 className="font-medium text-2xl w-full text-center">
                    {profile.username}
                  </h3>
                </div>
              </div>
              <div className="drawer-side mt-2">
                <div className="flex flex-col my-0 py-0">
                  {imgPreview ? (
                    <label htmlFor="avatar">
                      <img
                        src={imgPreview}
                        alt="preview"
                        className="w-20 h-20 rounded-xl mx-auto"
                        for="avatar"
                      />
                    </label>
                  ) : (
                    <label htmlFor="avatar">
                      <img
                        src={
                          profile.avatar
                            ? `${process.env.REACT_APP_VERCEL_URL}files/${profile.avatar}`
                            : People
                        }
                        alt="profile"
                        className="w-20 h-20 rounded-xl mx-auto"
                      />
                    </label>
                  )}
                  <form
                    enctype="multipart/form-data"
                    onSubmit={handleUpdateAvatar}
                    className="text-center mt-1"
                  >
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      className="hidden"
                      onChange={handleChangeAvatar}
                    />
                    {imgPreview && (
                      <button
                        type="submit"
                        className="py-1 px-2 border bg-indigo-500 text-xs text-white rounded-lg"
                      >
                        save
                      </button>
                    )}
                  </form>
                  <h5 className="mt-4 text-xl font-bold mx-auto">
                    {profile.name}
                  </h5>
                  <span className="mx-auto">{profile.username}</span>
                  <div className="flex flex-col mt-4">
                    <h3 className="font-medium text-2xl">Account</h3>
                    {phone === true ? (
                      <input
                        type="text"
                        name="phone"
                        value={dataUser.phone}
                        onChange={handleUpdateProfile}
                        onKeyPress={(e) => e.key === "Enter" && updatePhone()}
                        className="border-b py-1 mb-1 focus:outline-none bg-gray-100"
                      />
                    ) : (
                      <p>{profile.phone}</p>
                    )}
                    <span
                      className="text-indigo-400 font-normal text-xs cursor-pointer"
                      onClick={() => setPhone(!phone)}
                    >
                      Tap to change phone number
                    </span>
                    <hr className="my-3" />
                    {username === true ? (
                      <input
                        type="text"
                        name="username"
                        value={dataUser.username}
                        onChange={handleUpdateProfile}
                        onKeyPress={(e) =>
                          e.key === "Enter" && updateUsername()
                        }
                        className="border-b py-1 mb-1 focus:outline-none bg-gray-100"
                      />
                    ) : (
                      <p>{profile.username}</p>
                    )}
                    <span
                      className="text-indigo-400 font-normal text-xs cursor-pointer"
                      onClick={() => setUsername(!username)}
                    >
                      Username
                    </span>
                    <hr className="my-3" />
                    {bio === true ? (
                      <input
                        type="text"
                        name="bio"
                        value={dataUser.bio}
                        onChange={handleUpdateProfile}
                        onKeyPress={(e) => e.key === "Enter" && updateBio()}
                        className="border-b py-1 mb-1 focus:outline-none bg-gray-100"
                      />
                    ) : (
                      <p>{profile.bio}</p>
                    )}
                    <span
                      className="text-indigo-400 font-normal text-xs cursor-pointer"
                      onClick={() => setBio(!bio)}
                    >
                      Bio
                    </span>
                    <hr className="my-3" />
                    <h3 className="font-medium text-2xl">Settings</h3>
                    <p className="text-sm mt-2 font-medium">
                      Notification and Sounds
                    </p>
                    <p className="text-sm mt-2 font-medium">
                      Privaty and Security
                    </p>
                    <p className="text-sm mt-2 font-medium">Data and Stronge</p>
                    <p className="text-sm mt-2 font-medium">Chat settings</p>
                    <p className="text-sm mt-2 font-medium">Devices</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="h-40">
                <div className="flex justify-between items-center mt-8 text-indigo-400">
                  <h3 className="font-medium text-2xl">TELEGRAM</h3>
                  <Menu />
                </div>

                <Search
                  value={query}
                  placeholder="Type your message..."
                  giveClass="mt-12"
                  onChange={handleChangeSearch}
                />
              </div>
              <div className="overflow-y-auto listChat">
                {users &&
                  users.map((user) => (
                    <li
                      className="list-none flex items-center py-3 border-b"
                      onClick={() => setSelectedContact(() => user)}
                    >
                      <ListMessage users={user} message={chats} other={chat} />
                    </li>
                  ))}
              </div>
            </>
          )}
        </div>

        <div className={`h-screen w-screen ${selectedContact !== '' ? 'block' : 'hidden'} lg:w-3/4 bg-gray-50`}>
          {selectedContact ? (
            <ChatRoom
              data={selectedContact}
              chat={chat}
              onChange={handleInput}
              onClick={sendMessage}
              message={message}
              actionClick={() => confirm(selectedContact.id)}
              handleSetSelected={() => setSelectedContact('')}
            />
          ) : (
            <span className="">Please select a chat to start messaging</span>
          )}
        </div>
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" checked="false" />
        <div class="drawer-side absolute z-10 right-0 h-screen -mr-80">
          <label for="my-drawer-4" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <div className="flex justify-start items-center mt-5 text-indigo-400">
              <label for="my-drawer-4" class="drawer-button">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </label>

              <h3 className="font-medium text-2xl w-full text-center">
                {userSelect.username}
              </h3>
            </div>
            <div className="flex flex-col my-0 py-0">
              <div className="w-20 h-20 object-contain">
              <img
                src={
                  userSelect.avatar
                  ? `${process.env.REACT_APP_VERCEL_URL}files/${userSelect.avatar}`
                  : People
                }
                alt="profile"
                className="w-full h-full rounded-xl mx-auto mt-2 object-cover"
                />
                </div>
              <div className="flex flex-col mt-8">
                <h5 className="mt-4 text-xl font-bold">{userSelect.name}</h5>
                <span className="text-indigo-400 font-normal text-xs">
                  Online
                </span>
                <h3 className="font-medium text-lg mt-4">Phone number</h3>
                <p>{userSelect.phone}</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
