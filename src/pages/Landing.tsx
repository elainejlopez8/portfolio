import landing from '@/assets/landing.png';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function Landing() {
  const [aboutMe, setAboutMe] = useState(null);

  useEffect(() => {
    const url = '/src/assets/about_me.json';
    fetch(url)
      .then((res) => res.json())
      .then((about) => setAboutMe(about));
  }, []);

  return (
    <div className='landscape:gap-4 grid h-screen w-screen align-middle landscape:grid-cols-2'>
      <img src={landing} alt='hi bitmoji' className='p-2 sm:w-1/2 pointer-events-none m-auto' />
      <div className='my-auto text-center'>
        <h1 className='text-4xl'>{aboutMe && `I'm ${aboutMe?.name}`}</h1>
        <h2 className='text-3xl whitespace-pre'>{aboutMe && aboutMe?.profession}</h2>
        <Button href='/about-me' className='btn text-lg portrait:w-full' aria-placeholder='View Portfolio'>
          {aboutMe && aboutMe?.view_portfolio}
        </Button>
      </div>
    </div>
  );
}

export default Landing;
