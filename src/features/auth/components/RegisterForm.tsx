import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@auth/validation'
import { apiAuthPost } from '@features/auth/api/auth'
import { toast } from 'react-toastify';
import { useState } from 'react';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await apiAuthPost('/api/users/register', data)

      if (response.status === 201) {
        toast.success("Registration Successful! You can now sign in.")
        navigate('/login');
      } else {
        setLoading(false);
        toast.error(response.data.message)
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong! Please try again later.")
    }
  };

  return (
    <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">Create Your Dental Clinic Account</h2>

      <hr className="border border-green-600"/>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
           {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

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

        {/* Phone number Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Birthdate</label>
          <input
            type="date"
            {...register('userDetails.birthDate')}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Enter your Birthdate"
          />
           {errors.userDetails?.birthDate && <p className="mt-1 text-sm text-red-500">{errors.userDetails.birthDate.message}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register('password')}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Enter your password"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        {/* Register Button */}
        <button
          type={loading ? 'button' : 'submit'}
          className={`cursor-pointer w-full rounded-md ${loading ? 'bg-green-700' : 'bg-green-600'} px-4 py-2 text-white transition hover:bg-green-700`}
        >
          { loading ? 'Submitting...' : 'Register' }
        </button>

        {/* Extra Options */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
