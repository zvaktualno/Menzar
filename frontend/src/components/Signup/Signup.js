import React, { Component } from "react";
import { withRouter } from "react-router-dom"; // new import
import { connect } from "react-redux"; // new import
import PropTypes from "prop-types"; // new import
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form, FormControl } from "react-bootstrap";

import { signupNewUser } from "./SignupActions"; // new import

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // update function to call the action
    onSignupClick = () => {
        const userData = {
            username: this.state.username,
            password: this.state.password,
        };
        this.props.signupNewUser(userData); // <-- signup new user request
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col md="4">
                        <h1>Ustvarjanje računa</h1>
                        <Form>
                            <Form.Group controlId="usernameId">
                                <Form.Label>Uporabniško ime</Form.Label>
                                <Form.Control
                                    isInvalid={this.props.createUser.usernameError}
                                    type="text"
                                    name="username"
                                    placeholder="Vstavite uporabniško ime"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />
                                <FormControl.Feedback type="invalid">
                                    {this.props.createUser.usernameError}
                                </FormControl.Feedback>
                            </Form.Group>

                            <Form.Group controlId="passwordId">
                                <Form.Label>Geslo</Form.Label>
                                <Form.Control
                                    isInvalid={this.props.createUser.passwordError}
                                    type="password"
                                    name="password"
                                    placeholder="Vstavite geslo"
                                    value={this.password}
                                    onChange={this.onChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.props.createUser.passwordError.length > 0
                                        ? this.props.createUser.passwordError[0]
                                        : ""}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                        <Button color="primary" onClick={this.onSignupClick}>
                            Ustvari
                        </Button>
                        <p className="mt-2">
                            Že imate račun? <Link to="/login">Prijava</Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

// connect action and reducer
// replace
// export default Signup;
// with code below:

Signup.propTypes = {
    signupNewUser: PropTypes.func.isRequired,
    createUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    createUser: state.createUser,
});

export default connect(mapStateToProps, {
    signupNewUser,
})(withRouter(Signup));
