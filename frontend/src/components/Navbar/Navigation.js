import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="text-decoration-none text-black" href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link className="text-decoration-none text-black" href="/diners">
                            Diners
                        </Nav.Link>
                        <Nav.Link className="text-decoration-none text-black" href="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link className="text-decoration-none text-black" href="/login">
                            Login
                        </Nav.Link>
                        <Nav.Link className="text-decoration-none text-black" href="/signup">
                            Sign up
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
