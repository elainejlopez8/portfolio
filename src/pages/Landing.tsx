import landing from '@/assets/landing.png';
import { useContent } from '@/hooks/useContent';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { t } = useContent('aboutMe');
  const { t: tg } = useContent('general');
  const navigate = useNavigate();
  const [isShrinking, setIsShrinking] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleScrollToAbout = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (isShrinking) {
      return;
    }

    setIsShrinking(true);

    scrollTimeoutRef.current = window.setTimeout(() => {
      navigate('/welcome#home');
    }, 260);
  };

  return (
    <main
      className={`landing-panel layout-stack my-auto flex flex-col items-center text-center landscape:flex-row landscape:text-left${isShrinking ? ' is-shrinking' : ''}`}>
      <img
        src={landing}
        alt='hi bitmoji'
        className='landing-media pointer-events-none object-contain sm:w-1/2 lg:w-2/5'
      />
      <div className='landing-copy type-stack-base flex flex-col *:!mb-0 landscape:text-left'>
        <h1 className='type-display'>{t('subtitle', { name: tg('name') })}</h1>
        <h2 className='type-heading'>{t('profession')}</h2>
        <Button
          href='/welcome#home'
          variant='primary'
          className='landing-cta btn mx-auto !text-pink-500 hover:!text-white lg:w-1/2'
          target='_self'
          onClick={handleScrollToAbout}
          aria-label={t('viewPortfolio')}>
          {t('viewPortfolio')}
        </Button>
      </div>
    </main>
  );
};

export default Landing;
