import landing from '@/assets/landing.png';
import Markdown from '@/components/Markdown';
import useContent from '@/hooks/useContent';
import { Button } from 'react-bootstrap';

function Landing() {
  const { t } = useContent({ ns: 'aboutme', keyPrefix: 'aboutMe' });
  const { t: tg } = useContent({ ns: 'general', keyPrefix: 'general' });

  return (
    <div className='landscape:gap-4 grid h-screen w-screen align-middle landscape:grid-cols-2'>
      <img src={landing} alt='hi bitmoji' className='p-2 sm:w-1/2 pointer-events-none m-auto' />
      <div className='my-auto text-center'>
        <h1 className='text-4xl'>{t('subtitle', { name: tg('name') })}</h1>
        <Markdown source={t('profession')} />
        <Button href='/about-me' className='btn text-lg portrait:w-full' aria-label={t('viewPortfolio')}>
          {t('viewPortfolio')}
        </Button>
      </div>
    </div>
  );
}

export default Landing;
