import Image from 'next/image';
import Link from 'next/link';

import chatLogo from '../../../public/logo.png';
const PageLogo = () => {
  return (
    <div className='flex flex-col items-center gap-6 mt-4'>
      <div className='flex justify-center w-full max-w-2xl mb-4 sticky top-0 bg-white py-2'>
        <Link href='/'>
          <Image src={chatLogo} alt='chat logo' width={200} height={undefined} loading='eager' />
        </Link>
      </div>
    </div>
  );
};

export default PageLogo;
