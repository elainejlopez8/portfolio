import landing from '@/assets/landing.png';
import { useContent } from '@/hooks/useContent';
import { type CSSProperties, type MouseEvent, type ReactNode, useEffect, useRef, useState } from 'react';
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

type HomeHeaderProps = {
  onLearnMore?: () => void;
  showMainContent?: boolean;
};

const HomeHeader = ({ onLearnMore, showMainContent }: HomeHeaderProps) => {
  const { t: tg } = useContent('general');
  const { t } = useContent('aboutMe');
  const aboutMeHref = `${import.meta.env.BASE_URL}#aboutMe`;
  const footerLinks = tg('footer.urls', { returnObjects: true }) as Array<{
    href: string;
    icon?: string;
    alt?: string;
  }>;
  const socialLinks = footerLinks.filter((link) => link.alt !== 'Email');
  const webExperienceIcons = tg('header.web.icons', {
    returnObjects: true,
  }) as string[];
  const designExperienceIcons = tg('header.design.icons', {
    returnObjects: true,
  }) as string[];

  const [isNavigatingToAbout, setIsNavigatingToAbout] = useState(false);
  const [shrinkProgress, setShrinkProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
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
  }, []);

  const handleScrollToAbout = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (isNavigatingToAbout) {
      return;
    }

    setIsNavigatingToAbout(true);

    if (onLearnMore) {
      onLearnMore();
    }
    // Wait for the About section to render, then animate scroll to it.
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById('aboutMe');

      if (el) {
        const rect = el.getBoundingClientRect();
        const headerEl = document.querySelector('.site-header') as HTMLElement | null;
        const headerHeight = headerEl ? headerEl.offsetHeight : 0;
        const targetY = Math.max(0, window.pageYOffset + rect.top - headerHeight - 8);

        // Custom animated scroll for slower, consistent timing
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const duration = 800; // ms - slower than browser default
        const startTime = performance.now();

        const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

        const step = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, Math.max(0, elapsed / duration));
          const eased = easeInOutQuad(progress);
          const currentY = Math.round(startY + distance * eased);
          window.scrollTo(0, currentY);

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setIsNavigatingToAbout(false);
          }
        };

        window.requestAnimationFrame(step);

        return;
      }

      attempts += 1;
      if (attempts <= 20) {
        window.setTimeout(tryScroll, 20);
      } else {
        setIsNavigatingToAbout(false);
      }
    };

    window.setTimeout(tryScroll, 0);
  };

  const homeHeaderStyle = {
    '--home-header-scale': 1 - shrinkProgress * (1 - HOME_HEADER_MIN_SCALE),
    '--home-header-shell-extra-height': HOME_HEADER_SHELL_EXTRA_HEIGHT,
  } as CSSProperties;

  const COLLAPSE_THRESHOLD = 0.3;
  const isCollapsed = shrinkProgress >= COLLAPSE_THRESHOLD;

  const collapseStyle: CSSProperties = {
    display: isCollapsed ? 'none' : 'flex',
    transform: isCollapsed ? 'translateY(-6px)' : 'none',
    transition: 'opacity 180ms ease, transform 180ms ease',
    pointerEvents: isCollapsed ? 'none' : 'auto',
  };

  return (
    <Container fluid='lg' className='home-header-shell' id='home' ref={containerRef}>
      <div className='home-header' style={homeHeaderStyle}>
        <div className='home-header-copy'>
          <p className='type-body'>{tg('helloWorld')}</p>
          <h1 className='type-display'>{tg('name')}</h1>
          <h3 className='home-header-profession type-heading'>{t('profession')}</h3>
          <p className='type-body home-header-short-blurb' style={collapseStyle}>
            {t('short_blurb')}
          </p>

          <div className='home-header-actions' style={collapseStyle}>
            {!showMainContent && (
              <Button
                href={aboutMeHref}
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

          <div className='home-header-stats'>
            <div className='home-header-stat'>
              <Markdown
                source={tg('header.experience', {
                  numberOfYears: new Date().getFullYear() - 2023,
                })}
              />
              <p className='home-header-stat-copy'>
                <span>{tg('header.web.text')}</span>
                <span className='home-header-stat-icons home-header-stat-icons--web'>
                  {webExperienceIcons?.map((icon, index) => (
                    <span key={`web-icon-${index}`}>{iconMap[icon || '']}</span>
                  ))}
                </span>
              </p>
            </div>
            <div className='home-header-stat'>
              <Markdown
                source={tg('header.experience', {
                  numberOfYears: new Date().getFullYear() - 2021,
                })}
              />
              <p className='home-header-stat-copy'>
                <span>{tg('header.design.text')}</span>
                <span className='home-header-stat-icons home-header-stat-icons--design'>
                  {designExperienceIcons?.map((icon, index) => (
                    <span key={`design-icon-${index}`}>{iconMap[icon || '']}</span>
                  ))}
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
