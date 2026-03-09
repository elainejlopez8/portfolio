import landing from '@/assets/landing.png';
import Markdown from '@/components/Markdown';
import useContent from '@/hooks/useContent';
import { Button } from 'react-bootstrap';

function Landing() {
  const { t } = useContent({ ns: 'aboutme' });
  const { t: tg } = useContent();

  return (
    <main className='md:flex-row p-6 gap-8 flex min-h-screen w-full flex-col-reverse items-center justify-center'>
      <div className='md:text-left flex-1 text-center'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold'>{t('subtitle', { name: tg('name') })}</h1>
        <div className='mt-4'>
          <Markdown source={t('profession')} />
        </div>
        <Button href='/about-me' variant='primary' className='mt-6' aria-label={t('viewPortfolio')}>
          {t('viewPortfolio')}
        </Button>
      </div>

      <div className='flex flex-1 items-center justify-center'>
        <img
          src={landing}
          alt='hi bitmoji'
          className='w-44 sm:w-56 md:w-64 lg:w-72 pointer-events-none object-contain'
        />
      </div>
    </main>
  );
}

export default Landing;
