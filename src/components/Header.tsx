import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useContent } from "@/hooks/useContent";

const Header = () => {
	const { t } = useContent("general");
	const navLinks = t("navLinks", { returnObjects: true }) as Array<{
		href: string;
		label: string;
	}>;

	return (
		<Navbar collapseOnSelect expand="lg" className="site-header">
			<Container className="layout-container">
				<Navbar.Brand as={Link} to="/" className="site-header-brand">
					<img
						src={logo}
						alt="Portfolio Site Logo"
						className="site-header-logo"
					/>
				</Navbar.Brand>

				<Navbar.Toggle
					aria-controls="responsive-navbar-nav"
					className="site-header-toggle"
				/>

				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="site-header-nav">
						{navLinks.map((link) => (
							<Nav.Link
								key={link.href}
								as={Link}
								to={link.href}
								className="type-nav"
							>
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
