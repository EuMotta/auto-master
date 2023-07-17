/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { FaCog } from 'react-icons/fa';
import { themeList } from '../constants';

const Theme = ({ onThemeChange }) => {
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    onThemeChange(selectedTheme);
  };

  return (
    <div className="py-4  z-50 px-8 flex items-center">
      <div className="dropdown dropdown-right ">
        <label
          tabIndex={0}
          className=" flex justify-center btn btn-circle items-center"
        >
          <FaCog className="text-2xl" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
        >
          <select
            id="themeSelect"
            className="border border-base-300 rounded p-1"
            onChange={handleThemeChange}
          >
            {themeList.map((themeOption) => (
              <option
                key={themeOption}
                value={themeOption}
                className="flex items-center "
              >
                {themeOption}
              </option>
            ))}
          </select>
        </ul>
      </div>
    </div>
  );
};

export default Theme;
