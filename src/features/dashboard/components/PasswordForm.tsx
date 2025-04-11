import { useAuth } from '@context/AuthContext';
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { passwordSchema } from '@features/dashboard/validation'
import { apiUserPUT } from '@features/dashboard/api/user'
import { toast } from 'react-toastify';

interface IPassword {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const PasswordForm = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IPassword>({
    resolver: yupResolver(passwordSchema)
  })

  const onSubmit = async (data: IPassword) => {
    setLoading(true)

    try {
      const response = await apiUserPUT(`/api/users/update/password/${user.id}`, data)

      if (response.status === 200) {
        toast.success("You have changed your password")
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
          <h6 className="text-2xl font-bold text-gray-700">Update Password</h6>
        </div>
        <hr className="border-primary-500 mt-6 border-b-1" />
      </div>
      <div className="flex-auto px-4 py-6 lg:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              {...register('currentPassword')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your current password"
            />
            {errors.currentPassword && <p className="mt-1 text-sm text-red-500">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your new password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Re-enter your new password"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type={loading ? 'button' : 'submit'}
            className={`cursor-pointer rounded-md ${loading ? 'bg-green-700' : 'bg-green-600'} mt-6 px-8 py-2 text-white transition hover:bg-green-700`}
          >
            { loading ? 'Submitting...' : 'Update Password' }
          </button>
        </form>
      </div>
    </div>
  )
}

export default PasswordForm;