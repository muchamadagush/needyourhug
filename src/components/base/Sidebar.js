const Sidebar = () => {
  return (
    <>
      <div className="h-7">
        <div className="flex justify-start items-center mt-8 text-indigo-400">
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

          <h3 className="font-medium text-2xl w-full text-center">{profile.name}</h3>
        </div>
      </div>
      <div className="drawer-side">
        <div className="flex flex-col my-0 py-0">
          <img src={profile.avatar ? profile.avatar : People} alt="profile" className="w-20 h-20 rounded-xl mx-auto" />
          <h5 className="mt-6 text-xl font-bold mx-auto">{profile.name}</h5>
          <span className="mx-auto">{profile.username}</span>
          <div className="flex flex-col mt-4">
            <h3 className="font-medium text-2xl">Account</h3>
            <p>{profile.phone}</p>
            <span className="text-indigo-400 font-normal text-xs">Tap to change phone number</span>
            <hr className="my-5" />
            <p>{profile.username}</p>
            <span className="text-indigo-400 font-normal text-xs">Username</span>
            <hr className="my-5" />
            <p>{profile.bio}</p>
            <span className="text-indigo-400 font-normal text-xs">Bio</span>
            <hr className="my-5" />
            <h3 className="font-medium text-2xl">Settings</h3>
            <p className="text-sm mt-2 font-medium">Notification and Sounds</p>
            <p className="text-sm mt-2 font-medium">Privaty and Security</p>
            <p className="text-sm mt-2 font-medium">Data and Stronge</p>
            <p className="text-sm mt-2 font-medium">Chat settings</p>
            <p className="text-sm mt-2 font-medium">Devices</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
