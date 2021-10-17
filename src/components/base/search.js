const Search = ({ placeholder, giveClass, onChange, onClick, value }) => {
  return (
    <div class={`flex ${giveClass}`}>
      <input
        className="w-full rounded-full ml-1 border focus:outline-none px-4"
        type="text"
        name="search"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      <button class="text-indigo-400 hover:text-indigo-500" onClick={onClick}>
        <span class="w-auto flex justify-end items-center p-2">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Search;
