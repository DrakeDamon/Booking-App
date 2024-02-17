import React, { FC, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { HiLockClosed } from 'react-icons/hi';

const Login: FC = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      // Placeholder for actual login logic
      await router.push('/dashboard');
    } catch (loginError) {
      setError('Invalid login credentials');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    await login(input); // Wait for the login attempt to complete
  };

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {/* Your existing inputs */}
          <button type="submit" className="...">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
