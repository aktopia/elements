// @ts-nocheck
import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { isEmpty } from "lodash";

function formatOptionText({ description, matched_substrings }) {
  // TODO handle multiple matched_substrings, truncate on the correct span
  const { offset, length } = matched_substrings[0];
  return (
    <span className={"truncate"}>
      <span className={"whitespace-pre text-sm font-normal text-stone-600"}>
        {description.slice(0, offset)}
      </span>
      <span className={"whitespace-pre text-sm font-semibold text-stone-800"}>
        {description.slice(offset, offset + length)}
      </span>
      <span className={"whitespace-pre text-sm font-normal text-stone-600"}>
        {description.slice(length + offset)}
      </span>
    </span>
  );
}

export function Select({ onChange, options, onChoose }) {
  const [inputText, setInputText] = useState("");
  const [isInputFocussed, setIsInputFocussed] = useState(false);
  const showOptionsDropdown = !isEmpty(options) && isInputFocussed;
  const isInputTextEmpty = isEmpty(inputText);

  return (
    <div className="">
      <div className={"relative z-0"}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          onChange={(e) => {
            const value = e.target.value;
            onChange(value);
            setInputText(value);
          }}
          onFocus={() => setIsInputFocussed(true)}
          onBlur={() => setIsInputFocussed(false)}
          type="text"
          value={inputText}
          className="block h-10 w-full overflow-hidden rounded-lg border border-stone-50 bg-white py-4 pl-10 pr-10 text-stone-600 shadow-lg ring-0 placeholder:text-stone-400 focus:border-stone-50 focus:outline-none focus:ring-0"
          placeholder={"Search"}
        />
        {!isInputTextEmpty && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => {
              onChange("");
              setInputText("");
            }}
          >
            <XIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      <Transition
        show={showOptionsDropdown}
        as={Fragment}
        enter="transform transition ease-in-out duration-250"
        enterFrom="opacity-0 -translate-y-10"
        enterTo="opacity-100 translate-y-0"
      >
        <ul className="z-1 relative mt-1 w-full rounded-lg border border-stone-50 bg-white py-1 shadow-lg empty:hidden focus:outline-none sm:text-sm">
          {options.map((option) => (
            <li
              onClick={() => {
                onChoose(option);
                setInputText(option.description);
              }}
              key={option.place_id}
              className={
                "relative inline-flex w-full cursor-pointer py-2 pl-3 pr-4 hover:bg-stone-100"
              }
            >
              {formatOptionText(option)}
            </li>
          ))}
        </ul>
      </Transition>
    </div>
  );
}