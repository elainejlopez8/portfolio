import loading from '@/assets/loading.gif';

export const LoadingPage = () => (
  <div className='flex h-screen w-screen overflow-hidden'>
    <img
      src={loading}
      alt='loading logo'
      className='p-5 max-w-sm m-auto h-auto landscape:max-h-full landscape:w-auto'
    />
  </div>
);
