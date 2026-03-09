import landing from '@/assets/landing.png';
import Markdown from '@/components/Markdown';
import { useContent } from '@/hooks/useContent';
import { Button } from 'react-bootstrap';

function Landing() {
  const { t } = useContent('aboutMe');
  const { t: tg } = useContent('general');

  return (
    <main className='my-auto flex flex-col items-center gap-6 text-center landscape:flex-row-reverse landscape:text-justify'>
      <img src={landing} alt='hi bitmoji' className='pointer-events-none object-contain' />
      <div className=''>
        <h1 className='*:text-5xl'>{t('subtitle', { name: tg('name') })}</h1>
        <Markdown source={t('profession')} />
        <Button href='/about-me' variant='primary' className='mt-6' aria-label={t('viewPortfolio')}>
          {t('viewPortfolio')}
        </Button>
      </div>
    </main>
  );
}

export default Landing;
