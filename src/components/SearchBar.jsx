import { Button } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import labels from "../config/labels";

const SearchBar = ({ handleSearch, handleReset }) => {
  const [searchText, setSearchText] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searching, setSearching] = useState(false);

  return (
    <form className="flex flex-row items-center gap-3">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="flex flex-row  justify-center flex-wrap  xs:flex-nowrap  gap-2 ">
        <div className="flex flex-row items-center gap-2 md:gap-5">
          {(window.location.pathname == "/yawgi" ||
            window.location.pathname == "/yawgi/deleted/all" ||
            window.location.pathname == "/blacklist") && (
            <div className="relative flex-1">
              <div className="flex flex-row gap-0 items-center ">
                <label className="bg-slate-300 text-[16px]  rounded-s-md p-3.5 px-1 sm:px-3.5  border-[1px] border-gray-300">
                  {labels.idLabel}
                </label>
                <input
                  onChange={(e) => setSearchId(e.target.value)}
                  value={searchId}
                  placeholder="ID"
                  type="search"
                  title="ID ဖြင့်ရှာရန်"
                  className="md:min-w-[150px] w-full p-4 ps-3 pe-0 sm:pe-10 rounded-e-md text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="absolute hidden  top-5 right-4 sm:flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          )}
          <div className="relative flex-1">
            <div className="absolute top-5  flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            <input
              placeholder="..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="search"
              title="စာသား ဖြင့်ရှာရန်"
              id="default-search"
              className="block w-full md:min-w-[150px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <button
            onClick={(e) => {
              e.preventDefault();

              setSearching(true);
              handleSearch(searchText, searchId);
            }}
            type="submit"
            className="text-white min-w-[65px]  bg-primary hover:bg-soft_primary font-medium rounded-md  text-sm px-4 py-2.5  "
          >
            ရှာရန်
          </button>
          {searching && (
            <Button
              color="light"
              className="py-0.5 font-semibold !rounded-md"
              onClick={() => {
                setSearchText("");
                setSearchId("");
                setSearching(false);
                handleReset();
              }}
            >
              ဖျက်ရန်
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
