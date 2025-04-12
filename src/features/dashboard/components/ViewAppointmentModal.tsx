import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { formattedDate } from '@utils/formatter'
import AppointmentDetails from '@features/dashboard/components/AppointmentDetails'

interface ViewAppointmenModalProps {
  view: boolean;
  setView: (view: boolean) => void; 
  appointment: any
}

const ViewAppointmenModal: React.FC<ViewAppointmenModalProps> = ({ view, setView, appointment }) => {
  return (
    <Dialog open={view} onClose={setView} className="relative z-20">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <AppointmentDetails appointment={appointment}/>
            
            <div className="mt-5 sm:mt-6 text-center">
              <button
                type="button"
                data-autofocus
                onClick={() => setView(false)}
                className="mt-3 cursor-pointer inline-flex px-8 mx-auto justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ViewAppointmenModal
