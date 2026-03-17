import logo from '@/assets/logo.png';
import { useContent } from '@/hooks/useContent';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t } = useContent('general');
  const navLinks = t('navLinks', { returnObjects: true }) as Array<{
    href: string;
    label: string;
  }>;
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setIsEntering(false), 60);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <Navbar collapseOnSelect expand='lg' className={`site-header ${isEntering ? 'site-header--entering' : ''}`}>
      <Container className='layout-container'>
        <Navbar.Brand
          as={Link}
          to='/'
          className='site-header-brand'
          onClick={() => {
            if (window.location.hash) {
              window.history.replaceState(null, '', window.location.pathname);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}>
          <img src={logo} alt='Portfolio Site Logo' className='site-header-logo' />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' className='site-header-toggle' />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='site-header-nav'>
            {navLinks.map((link) => (
              <Nav.Link key={link.href} as={Link} to={link.href} className='type-nav'>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
