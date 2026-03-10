import logo from '@/assets/logo.png';
import { useContent } from '@/hooks/useContent';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  const { t } = useContent('general');
  const navLinks = t('navLinks', { returnObjects: true }) as Record<string, { href: string; label: string }>;

  return (
    <Navbar collapseOnSelect expand='lg' className='site-header'>
      <Container className='layout-container'>
        <Navbar.Brand href='/' className='site-header-brand'>
          <img src={logo} alt='Portfolio Site Logo' className='site-header-logo' />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' className='site-header-toggle' />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='site-header-nav'>
            {Object.entries(navLinks).map(([key, link]) => (
              <Nav.Link key={key} href={link.href} className='type-nav'>
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
