import { useAuth } from '@context/AuthContext';
import { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileSchema } from '@features/dashboard/validation'
import { format } from 'date-fns';
import { apiUserPUT } from '@features/dashboard/api/user'
import { toast } from 'react-toastify';

interface IProfile {
  userDetails: {
    firstName: string;
    lastName: string;
    phoneNumber:string;
    birthDate: string;
  }
}

const ProfileForm = () => {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IProfile>({
    resolver: yupResolver(profileSchema)
  })

  useEffect(() => {
    if (user) {
      reset({
        userDetails: {
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          birthDate: format(new Date(user.birthDate), "MM-dd-yyyy"),
          phoneNumber: user?.phoneNumber || ''
        }
      })
    }
  }, [user, reset])

  const onSubmit = async (data: IProfile) => {
    setLoading(true)

    try {
      const response = await apiUserPUT(`/api/users/update/${user.id}`, data)

      if (response.status === 200) {
        toast.success("You have updated your profile")
        updateUser(data)
        setLoading(false)
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
    <div className="relative mb-6 flex w-full min-w-0 flex-col rounded-lg border-0 bg-white break-words shadow-lg">
      <div className="mb-0 rounded-t px-6 py-6">
        <div className="mb-3 text-left">
          <h6 className="text-2xl font-bold text-gray-700">My Profile</h6>
        </div>
        <hr className="border-primary-500 mt-6 border-b-1" />
      </div>
      <div className="flex-auto px-4 py-6 lg:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* First name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                {...register('userDetails.firstName')}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your first name"
              />
              {errors.userDetails?.firstName && <p className="mt-1 text-sm text-red-500">{errors.userDetails.firstName.message}</p>}
            </div>

            {/* Last name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                {...register('userDetails.lastName')}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your last name"
              />
              {errors.userDetails?.lastName && <p className="mt-1 text-sm text-red-500">{errors.userDetails.lastName.message}</p>}
            </div>
          </div>
          

          {/* Phone number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              {...register('userDetails.phoneNumber')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your contact number"
            />
            {errors.userDetails?.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.userDetails.phoneNumber.message}</p>}
          </div>

          {/* Birthdate Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Birthdate</label>
            <input
              type="text"
              {...register('userDetails.birthDate')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your Birthdate"
            />
            {errors.userDetails?.birthDate && <p className="mt-1 text-sm text-red-500">{errors.userDetails.birthDate.message}</p>}
          </div>

          <button
            type={loading ? 'button' : 'submit'}
            className={`cursor-pointer rounded-md ${loading ? 'bg-green-700' : 'bg-green-600'} mt-6 px-8 py-2 text-white transition hover:bg-green-700`}
          >
            { loading ? 'Submitting...' : 'Update Profile' }
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm;