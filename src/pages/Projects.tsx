import { usePageLayout } from '@/components/PageLayout';
import ProjectsPlaceholder from '@/components/ProjectsPlaceholder';
import { useContent } from '@/hooks/useContent';
import type { CONTENT_KEYS } from '@/services/content/i18n';
import type { PageProps } from '@/types';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const DEFAULT_SECTION_ID = 'projects';
const DEFAULT_TITLE = 'Projects';

const Projects = ({ sectionId = DEFAULT_SECTION_ID, title = DEFAULT_TITLE }: PageProps) => {
  const { setLoaded } = usePageLayout();
  const { t } = useContent(sectionId as CONTENT_KEYS);

  useEffect(() => setLoaded(true), [setLoaded]);

  return (
    <Container fluid='lg' className='page-section' id={sectionId}>
      <ProjectsPlaceholder placeholderTitle={title} useAuthenticated={true} />
    </Container>
  );
};

export default Projects;
