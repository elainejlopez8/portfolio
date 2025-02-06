import loading from '../../assets/loading.gif';

export const LoadingPage = () => (
  <div className='flex h-screen'>
    <img src={loading} alt='loading logo' className='p-5 sm:w-1/2 md:portrait:w-4/5 lg:w-2/5 m-auto' />
  </div>
);
