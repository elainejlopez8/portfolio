import landing from '@/assets/landing.png';
import { useContent } from '@/hooks/useContent';
import { Button } from 'react-bootstrap';

function Landing() {
  const { t } = useContent('aboutMe');
  const { t: tg } = useContent('general');

  return (
    <main className='my-auto flex flex-col items-center gap-6 text-center landscape:flex-row landscape:text-left'>
      <img src={landing} alt='hi bitmoji' className='pointer-events-none object-contain sm:w-1/2' />
      <div className='flex flex-col gap-y-4 *:!mb-0 landscape:text-justify'>
        <h1>{t('subtitle', { name: tg('name') })}</h1>
        <h2>{t('profession')}</h2>
        <Button href='/about-me' variant='primary' className='btn' target='_self' aria-label={t('viewPortfolio')}>
          {t('viewPortfolio')}
        </Button>
      </div>
    </main>
  );
}

export default Landing;
