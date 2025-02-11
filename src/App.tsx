import PageLayout from '@/components/PageLayout/PageLayout';
import { PageLayoutProviderWrapper } from '@/components/PageLayout/PageLayoutProvider';
import Landing from '@/pages/Landing';
import { RouteObject, useRoutes } from 'react-router-dom';
// import PageLayout from './components/PageLayout';
// import { PageLayoutProviderWrapper } from './components/PageLayout/PageLayoutProvider';
// import ResumeItemCard from './components/Resume/ResumeCard';
// import AboutMe from './pages/AboutMe';
// import ProjectCard from './pages/ProjectCard';
// import Projects from './pages/Projects';
// import Resume from './pages/Resume';

function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/about-me',
      // element: <AboutMe />,
    },
    {
      path: '/projects',
      // element: <Projects />,
      children: [
        {
          path: ':projectName',
          // element: <ProjectCard />,
        },
      ],
    },
    {
      path: '/resume',
      // element: <Resume />,
      children: [
        {
          path: ':resumeCategory',
          // element: <Resume />,
        },
      ],
    },
    {
      path: '/resume/:resumeCategory/:resumeItem',
      // element: <ResumeItemCard />,
    },
  ];

  return (
    <PageLayoutProviderWrapper>
      <PageLayout>{useRoutes(routes)}</PageLayout>
    </PageLayoutProviderWrapper>
  );
}

export default App;
