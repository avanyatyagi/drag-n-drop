import React from "react";

const Dropdown = ({ showDropdown, setShowDropdown, handleDropdownOption }) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className=" w-full justify-center gap-x-1.5 rounded-md bg-[#AF273E] px-3 py-2 text-xl font-semibold text-white shadow-sm"
        >
          Add
        </button>
      </div>
      {showDropdown && (
        <div className="origin-top-right absolute right-0 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => handleDropdownOption("Upload Resource")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Upload Resource
            </button>
            <hr />
            <button
              onClick={() => handleDropdownOption("Create Module")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Create Module
            </button>
            <button
              onClick={() => handleDropdownOption("Add Link")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Add Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
