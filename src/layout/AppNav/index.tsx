import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function AppNav() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><Link to='/dashboard'>Hack Ideas</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link><Link to='/dashboard'>Dashboard</Link></Nav.Link>
                        <Nav.Link>
                            <Link to='/events'>
                            Events
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}