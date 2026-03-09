import logo from '@/assets/logo.png';
import useContent from '@/hooks/useContent';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  const { t } = useContent();
  const navLinks = t('navLinks', { returnObjects: true }) as Record<string, { href: string; label: string }>;

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      className='mb-4 rounded-md mx-auto w-full bg-gradient-to-b from-purple-200 to-transparent'>
      <Container className='px-4'>
        <Navbar.Brand href='/'>
          <img src={logo} alt='Portfolio Site Logo' className='h-10 sm:h-12 md:h-14 mr-3 w-auto object-contain' />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' className='border-0' />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='gap-4 ml-auto flex items-center'>
            {Object.entries(navLinks).map(([key, link]) => (
              <Nav.Link key={key} href={link.href} className='text-lg'>
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
