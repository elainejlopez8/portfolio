import loading from '@/assets/loading.gif';

export const LoadingPage = () => (
  <div className='flex h-screen w-screen items-center justify-center'>
    <img src={loading} alt='Loading' className='p-5 h-auto w-fit' />
  </div>
);
