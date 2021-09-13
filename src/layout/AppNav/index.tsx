import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from '../../styles/styles.module.scss';
import { logoutEmployee } from '../../redux/actions/login.actions';
export default function AppNav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutFromSystem = () => {
    dispatch(logoutEmployee());
    localStorage.removeItem('employee');
    history.push('/login');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <NavLink className={styles.link} to="/dashboard">Hack Ideas</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>
              <NavLink className={styles.link} activeClassName={styles.active} to="/dashboard">Dashboard</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className={styles.link} activeClassName={styles.active} to="/add-events">Add Events</NavLink>
            </Nav.Link>
            <Nav.Link>
              <Button title="Logout" onClick={logoutFromSystem}><i className="fas fa-power-off"></i></Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
