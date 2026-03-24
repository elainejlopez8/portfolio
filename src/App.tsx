import PageLayout from '@/components/PageLayout';
import { Analytics } from '@vercel/analytics/react';
import { Suspense, lazy } from 'react';
import { type RouteObject, useLocation, useRoutes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const AboutMe = lazy(() => import('@/pages/AboutMe'));
const Projects = lazy(() => import('@/pages/Projects'));
const Resume = lazy(() => import('@/pages/Resume'));
const ResumeItemCard = lazy(() => import('@/components/Resume/ResumeCard'));

function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/about-me',
      element: <AboutMe />,
    },
    {
      path: '/projects',
      element: <Projects />,
      children: [
        {
          path: ':projectName',
          // element: <ProjectCard />,
        },
      ],
    },
    {
      path: '/resume',
      element: <Resume />,
    },
    {
      path: '/resume/:resumeCategory',
      element: <Resume />,
    },
    {
      path: '/resume/:resumeCategory/:resumeItem',
      element: <ResumeItemCard />,
    },
  ];

  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/';

  return (
    <PageLayout showHeaderFooter={showHeaderFooter}>
      <Suspense fallback={null}>{useRoutes(routes)}</Suspense>
      <Analytics />
    </PageLayout>
  );
}

export default App;
