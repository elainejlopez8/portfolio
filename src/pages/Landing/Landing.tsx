import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import landing from '../../assets/landing.png';

export default function LandingPage() {
  const [aboutMe, setAboutMe] = useState(null);

  useEffect(() => {
    const url = '/src/assets/about_me.json';
    fetch(url)
      .then((res) => res.json())
      .then((about) => setAboutMe(about));
  }, []);

  return (
    <div className='m-auto flex items-center justify-center portrait:flex-col landscape:flex-row'>
      <img
        src={landing}
        alt='hi bitmoji'
        className='portrait:px-5 sm:w-1/3 md:portrait:w-2/3 lg:w-2/5 pointer-events-none'
      />
      <div className='portrait:mt-2 landscape:ml-5 text-center'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl'>
          {aboutMe && `I'm ${aboutMe.name}`}
        </h1>
        <h2 className='text-3xl mb-3 sm:text-4xl sm:mb-4 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl whitespace-pre'>
          {aboutMe && aboutMe.profession}
        </h2>
        <Button
          href='/about-me'
          className='btn text-lg sm:text-xl md:text-3xl md:px-12 md:py-3 lg:text-4xl lg:px-16 portrait:w-full'
          aria-placeholder='View Portfolio'>
          {aboutMe && aboutMe.view_portfolio}
        </Button>
      </div>
    </div>
  );
}
