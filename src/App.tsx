import PageLayout from '@/components/PageLayout';
import AboutMe from '@/pages/AboutMe';
import Home from '@/pages/Home';
import Landing from '@/pages/Landing';
import { RouteObject, useLocation, useRoutes } from 'react-router-dom';

function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/welcome',
      element: <Home />,
    },
    {
      path: '/about-me',
      element: <AboutMe />,
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

  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/';

  return <PageLayout showHeaderFooter={showHeaderFooter}>{useRoutes(routes)}</PageLayout>;
}

export default App;
