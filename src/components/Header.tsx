import logo from '@/assets/logo.png';
import { useContent } from '@/hooks/useContent';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  const { t } = useContent('general');
  const navLinks = t('navLinks', { returnObjects: true }) as Record<string, { href: string; label: string }>;

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      className='mx-auto mb-4 w-full rounded-md bg-gradient-to-b from-purple-200 to-transparent'>
      <Container className='px-4'>
        <Navbar.Brand href='/'>
          <img src={logo} alt='Portfolio Site Logo' className='mr-3 h-10 w-auto object-contain sm:h-12 md:h-14' />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' className='border-0' />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto flex items-center gap-4'>
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
