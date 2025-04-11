import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@auth/validation'
import { apiAuthPost } from '@features/auth/api/auth'
import { useAuth } from '@context/AuthContext';
import { toast } from 'react-toastify';
import { useState } from 'react';

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await apiAuthPost('/api/auth/login', data)

      if (response.status === 200) {
        login()
        window.location.reload(); 
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
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">Welcome to Dental Clinic</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        {/* Login Button */}
        <button
          type={loading ? 'button' : 'submit'}
          className={`cursor-pointer w-full rounded-md ${loading ? 'bg-green-700' : 'bg-green-600'} px-4 py-2 text-white transition hover:bg-green-700`}
        >
          { loading ? 'Submitting...' : 'Login' }
        </button>

        {/* Extra Options */}
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
