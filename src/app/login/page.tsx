import LoginButton from '@/components/custom/LoginButton';

const LoginPage = () => {
  return (
    <>
      <div className='flex flex-col items-center gap-6 p-4 sm:p-6 min-h-screen'>
        <div className='text-center mb-4'>Please log in to continue</div>
        <LoginButton />
      </div>
    </>
  );
};

export default LoginPage;
