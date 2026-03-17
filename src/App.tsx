import PageLayout from '@/components/PageLayout';
import ResumeItemCard from '@/components/Resume/ResumeCard';
import AboutMe from '@/pages/AboutMe';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Resume from '@/pages/Resume';
import { type RouteObject, useLocation, useRoutes } from 'react-router-dom';

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
      children: [
        {
          path: ':resumeCategory',
          element: <Resume />,
          children: [
            {
              path: '/resume/:resumeCategory/:resumeItem',
              element: <ResumeItemCard />,
            },
          ],
        },
      ],
    },
  ];

  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/';

  return <PageLayout showHeaderFooter={showHeaderFooter}>{useRoutes(routes)}</PageLayout>;
}

export default App;
