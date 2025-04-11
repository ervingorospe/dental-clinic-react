import { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react';
import CancellationModal from '@features/dashboard/components/CancellationModal'
import ViewAppointmenModalProps from '@features/dashboard/components/ViewAppointmentModal'

interface MenuDropdownProps {
  appointment: any;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ appointment }) => {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(false)

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
          <button
            onClick={() => setView(true)}
            className="block px-4 py-2 text-sm text-left cursor-pointer text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden w-full"
          >
            View
          </button>
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
          <button
            onClick={() => setOpen(true)}
            className="block px-4 py-2 text-sm text-left cursor-pointer text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden w-full"
          >
            Cancel
          </button>
        </MenuItem>
      </MenuItems>

      <CancellationModal open={open} setOpen={setOpen} appointment={appointment}/>
      <ViewAppointmenModalProps  view={view} setView={setView} appointment={appointment}/>
    </Menu>
  )
}

export default MenuDropdown