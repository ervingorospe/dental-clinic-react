import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

interface User {
  id: number,
  firstName: string;
  lastName: string;
  role: string;
  active: boolean;
}

interface UserSelectInputProps {
  selectedUser: User | null;
  users: any;
  setSelectedUser: (user: User) => void;
}

const UserSelectInput: React.FC<UserSelectInputProps> = ({ selectedUser, setSelectedUser, users }) => {
  return (
    <Listbox value={selectedUser} onChange={setSelectedUser}>
      <Label className="block text-sm/6 font-medium text-gray-900">Select a Doctor</Label>
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-2 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          {
            selectedUser && (
              <span className="col-start-1 row-start-1 flex w-full gap-2 pr-6">
                <span className="truncate">{selectedUser?.firstName ?? ''} {selectedUser.lastName ?? ''}</span>
              </span>
            )
          }
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {users.map((user: any) => (
            <ListboxOption
              key={user.id}
              value={user}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex">
                <span className="truncate font-normal group-data-selected:font-semibold">{user.firstName} {user.lastName}</span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export default UserSelectInput
