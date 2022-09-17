// @ts-nocheck
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ClockIcon,
  DotsHorizontalIcon,
  PencilIcon,
} from "@heroicons/react/outline";

export function ContextMenu({ className }) {
  return (
    <Menu as="div" className={className + " relative"}>
      <Menu.Button>
        <DotsHorizontalIcon
          className={"h-5 w-5 text-gray-300 hover:text-gray-500 md:h-6 md:w-6"}
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-blue-500 text-white" : "text-gray-900"
                } group flex w-full items-center px-3 py-3 text-sm`}
              >
                <PencilIcon
                  className={`${
                    active ? "text-white" : "text-blue-500"
                  } mr-3 h-5 w-5`}
                />
                Edit
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-blue-500 text-white" : "text-gray-900"
                } group flex w-full items-center px-3 py-3 text-sm`}
              >
                <ClockIcon
                  className={`${
                    active ? "text-white" : "text-blue-500"
                  } mr-3 h-5 w-5`}
                />
                History
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
