import { useState, useEffect } from "react";
import _ from "lodash";

export default function Header(props) {
  const [value, setValue] = useState("");

  const [debouncedValue, setDebouncedValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeTheme = ()=>{
    document.documentElement.classList.toggle('dark');
  }

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
      <button className="dark:bg-violet-950 bg-violet-600 p-4 rounded-xl hover:brightness-75 text-white" onClick={()=>handleChangeTheme()}>
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
    </div>
  );
}
