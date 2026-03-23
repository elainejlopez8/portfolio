import landing from '@/assets/landing.png';
import { useContent } from '@/hooks/useContent';
import { type CSSProperties, type MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaFigma, FaNodeJs, FaNpm, FaReact } from 'react-icons/fa6';
import { PiCodepenLogoBold, PiGithubLogoBold } from 'react-icons/pi';
import { TbBrandTypescript, TbUxCircle } from 'react-icons/tb';
import { TfiLinkedin } from 'react-icons/tfi';
import Markdown from './Markdown';

const iconMap: Record<string, ReactNode> = {
  TfiLinkedin: <TfiLinkedin />,
  PiGithubLogoBold: <PiGithubLogoBold />,
  PiCodepenLogoBold: <PiCodepenLogoBold />,
  TbBrandTypescript: <TbBrandTypescript />,
  FaFigma: <FaFigma />,
  FaNodeJs: <FaNodeJs />,
  FaNpm: <FaNpm />,
  FaReact: <FaReact />,
  TbUxCircle: <TbUxCircle />,
};

const HOME_HEADER_MIN_SCALE = 0.82;
const HOME_HEADER_SHRINK_DISTANCE_FACTOR = 0.95;
const HOME_HEADER_SHELL_EXTRA_HEIGHT = 'clamp(10rem, 16vw, 18rem)';

const HomeHeader = ({ onLearnMore, showContent = true }: { onLearnMore?: () => void; showContent?: boolean }) => {
  const { t: tg } = useContent('general');
  const { t } = useContent('aboutMe');
  const footerLinks = tg('footer.urls', { returnObjects: true }) as Array<{
    href: string;
    icon?: string;
    alt?: string;
  }>;
  const socialLinks = footerLinks.filter((link) => link.alt !== 'Email');
  const webExperienceIcons = tg('header.web.icons', { returnObjects: true }) as string[];
  const designExperienceIcons = tg('header.design.icons', { returnObjects: true }) as string[];

  const [isNavigatingToAbout, setIsNavigatingToAbout] = useState(false);
  const [shrinkProgress, setShrinkProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!showContent) {
      setShrinkProgress(0);
      return;
    }
    const handleScroll = () => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const { top, height, bottom } = container.getBoundingClientRect();

      if (bottom <= 0 || height <= 0) {
        setShrinkProgress(1);
        return;
      }

      if (top >= 0) {
        setShrinkProgress(0);
        return;
      }

      const scrollDistance = Math.max(height * HOME_HEADER_SHRINK_DISTANCE_FACTOR, 1);
      const scrollProgress = Math.min(1, Math.abs(top) / scrollDistance);
      setShrinkProgress(scrollProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [showContent]);

  const handleScrollToAbout = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (isNavigatingToAbout) {
      return;
    }

    setIsNavigatingToAbout(true);

    scrollTimeoutRef.current = window.setTimeout(() => {
      if (onLearnMore) {
        // Only scroll and update hash if onLearnMore is provided
        const el = document.getElementById('aboutMe');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.location.hash !== '#aboutMe') {
            window.location.hash = '#aboutMe';
          }
        } else {
          window.location.hash = '#aboutMe';
        }
        onLearnMore();
      }
      setIsNavigatingToAbout(false);
    }, 260);
  };

  const homeHeaderStyle = {
    '--home-header-scale': !showContent ? 1 : 1 - shrinkProgress * (1 - HOME_HEADER_MIN_SCALE),
    '--home-header-shell-extra-height': HOME_HEADER_SHELL_EXTRA_HEIGHT,
    minHeight: !showContent ? '100vh' : undefined,
    width: !showContent ? '100vw' : undefined,
    overflow: !showContent ? 'hidden' : undefined,
    padding: 0,
    margin: 0,
  } as CSSProperties;

  return (
    <Container
      fluid='lg'
      className='home-header-shell'
      id='home'
      ref={containerRef}
      style={
        !showContent
          ? {
              minHeight: '100dvh',
              height: '100dvh',
              width: '100%',
              maxWidth: '100%',
              overflow: 'hidden',
              margin: 0,
              padding: 0,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'stretch',
            }
          : undefined
      }>
      <div
        className='home-header'
        style={{
          ...homeHeaderStyle,
          minHeight: !showContent ? '100dvh' : undefined,
          height: !showContent ? '100dvh' : undefined,
          width: !showContent ? '100vw' : undefined,
          maxWidth: !showContent ? '100vw' : undefined,
          overflow: !showContent ? 'hidden' : undefined,
        }}>
        <div className='home-header-copy'>
          <p className='type-body'>{tg('helloWorld')}</p>
          <h1 className='type-display'>{tg('name')}</h1>
          <h3 className='home-header-profession type-heading'>{t('profession')}</h3>
          {(!showContent || shrinkProgress === 0) && (
            <>
              <p className='type-body home-header-short-blurb'>{t('short_blurb')}</p>

              <div className='home-header-actions'>
                {!showContent && (
                  <Button
                    href='#aboutMe'
                    variant='primary'
                    size='sm'
                    className='btn btn-primary home-header-cta text-pink-500! hover:transform-none! hover:text-white!'
                    target='_self'
                    onClick={handleScrollToAbout}
                    aria-label={t('viewPortfolio')}>
                    {tg('learnMore')}
                  </Button>
                )}

                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={link.alt}
                    className='home-header-social-link type-icon'>
                    {iconMap[link.icon || '']}
                  </a>
                ))}
              </div>
            </>
          )}
          <div className='home-header-stats'>
            <div className='home-header-stat'>
              <Markdown source={t('header.experience', { numberOfYears: new Date().getFullYear() - 2023 })} />
              <p className='home-header-stat-copy'>
                <Markdown source={t('header.web.text')} />
                <span className='home-header-stat-icons home-header-stat-icons--web'>
                  {webExperienceIcons?.map((icon) => iconMap[icon || ''])}
                </span>
              </p>
            </div>
            <div className='home-header-stat'>
              <Markdown source={t('header.experience', { numberOfYears: new Date().getFullYear() - 2021 })} />
              <p className='home-header-stat-copy'>
                <Markdown source={t('header.design.text')} />
                <span className='home-header-stat-icons home-header-stat-icons--design'>
                  {designExperienceIcons?.map((icon) => iconMap[icon || ''])}
                </span>
              </p>
            </div>
          </div>
        </div>
        <img src={landing} alt='Hi Bitmoji' aria-describedby='Hi Bitmoji' className='home-header-media' />
      </div>
    </Container>
  );
};

export default HomeHeader;
