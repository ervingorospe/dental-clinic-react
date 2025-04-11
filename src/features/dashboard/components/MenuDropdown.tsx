import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react';

interface MenuDropdownProps {
  appointmentId: number;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ appointmentId }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="cursor-pointer text-base md:text-xl">
          <i className="fa-solid fa-ellipsis-vertical text-gray-900 hover:text-green-600 transition-all duration-300"></i>
        </MenuButton>
      </div>

      <MenuItems
        transition
        style={{ zIndex: 100 }}
        className="absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
          >
            View
          </a>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
          >
            Reschedule
          </a>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
          >
            Cancel
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

export default MenuDropdown