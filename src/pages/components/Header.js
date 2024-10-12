import { useState, useEffect } from "react";
import _ from "lodash";

export default function Header(props) {
  const [value, setValue] = useState("");

  const [debouncedValue, setDebouncedValue] = useState("");

  const [theme, setTheme] = useState(props.theme || "");

  useEffect(() => {
    setTheme(props.theme);
  }, [props.theme]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(props.input);
  }, [props.input]);

  useEffect(() => {
    const debounced = _.debounce(() => setDebouncedValue(value), 1000);
    debounced();

    return () => {
      debounced.cancel();
    };
  }, [value]);

  useEffect(() => {
    if (debouncedValue === "") return;
    props.updateSearchKey(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="w-[100%] flex gap-x-4 items-center justify-between">
      <div className="w-[80%]">
        <input
          type="text"
          className="w-[100%] dark:bg-violet-800 bg-violet-300 p-4 border rounded-xl border-none outline-none dark:text-white  text-black"
          value={value}
          onChange={handleChange}
        />
      </div>
      <button className="dark:bg-violet-950 bg-violet-600 p-4 rounded-xl hover:brightness-75 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
      <button
        className="dark:bg-violet-950 bg-violet-600 p-4 rounded-xl hover:brightness-75 text-white"
        onClick={() => props.changeTheme()}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
