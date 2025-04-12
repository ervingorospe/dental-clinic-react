import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { apiPUT } from '@features/dashboard/api/api'
import { toast } from 'react-toastify';
import { useAuth } from '@context/AuthContext';
import { useDispatch } from 'react-redux';
import { fetchAppointments } from '@redux/slices/appointmentsSlice';
import { Status } from '@features/dashboard/constants';
import { AppDispatch } from '@redux/store';

interface CompleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void; 
  appointment: any
}

const CompleteModal: React.FC<CompleteModalProps> = ({ open, setOpen, appointment }) => {
  const { user } = useAuth()
  const dispatch = useDispatch<AppDispatch>();
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    const data = {
      userId: user.id,
      notes
    }

    try {
      const response = await apiPUT(`/api/appointments/complete/${appointment.id}`, data)

      if (response.status === 200) {
        toast.success("You have Completed your appointment")
        setLoading(false)
        setOpen(false)
        
        const userId = user.id;
        const status = Status.CONFIRMED.toString();
        const limit = 10; 
        const startDate = new Date().toISOString()
    
        dispatch(fetchAppointments({ userId, status, limit, startDate }));
      } else {
        setLoading(false);
        toast.error(response.data.message)
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong! Please try again later.")
    }
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-20">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                <CheckIcon aria-hidden="true" className="size-6 text-green-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  Complete Appointment for { appointment.service.name }
                </DialogTitle>
              </div>
            </div>
            <div className="mt-4 px-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                  rows={6}
                >
                </textarea>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSubmit()}
                  className={`cursor-pointer inline-flex w-full justify-center rounded-md ${loading ? 'bg-green-500' : 'bg-green-600'} px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto`}
                >
                  { loading ? 'Submitting' : 'Complete Appointment' }
                </button>
              </div>
            </div>
            
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default CompleteModal
