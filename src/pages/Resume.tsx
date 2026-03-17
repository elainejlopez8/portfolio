import waitImg from '@/assets/wait.png';
import Markdown from '@/components/Markdown';
import { usePageLayout } from '@/components/PageLayout';
import { useContent } from '@/hooks/useContent';
import type { CONTENT_KEYS } from '@/services/content/i18n';
import type { PageProps } from '@/types';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const DEFAULT_SECTION_ID = 'resume';
const DEFAULT_TITLE = 'Resume';

const Resume = ({ sectionId = DEFAULT_SECTION_ID, title = DEFAULT_TITLE }: PageProps) => {
  const { setLoaded } = usePageLayout();
  const { t } = useContent(sectionId as CONTENT_KEYS);

  useEffect(() => setLoaded(true), [setLoaded]);

  return (
    <Container fluid='lg' className='page-section' id={sectionId}>
      <h1 className='type-display uppercase'>{title}</h1>
      <div className='flex flex-col items-center gap-2'>
        <img src={waitImg} alt={t('content')} className='w-1/4' />
        <Markdown source={t('content')} />
      </div>
    </Container>
  );
};

export default Resume;
