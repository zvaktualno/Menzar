import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import { logout } from "../Login/LoginActions";
import Order from "../Order/Order";

class Dashboard extends Component {
  constructor(props) {
      super(props);
      this.state = {
            error: null,
            isLoaded: false,
            orders: []
    };
    
    this.apiUrl = 'http://127.0.0.1:8000/api/v1/user/' + this.props.auth.user.username + '/orders/';
    this.displayElement = null;
  }
  
  onLogout = () => {
    this.props.logout();
  };
  
  componentDidMount() {
        fetch(this.apiUrl)
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    orders: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error: error
                });
            }
        );
  }
    

    
  render() {
    const {user} = this.props.auth;
    const { error, isLoaded, orders } = this.state;
    if (error) {
        this.displayElement = (<div>Error: {error.message}</div>);
    }
    else if (!isLoaded) {
        this.displayElement =  (<div>Loading...</div>);
    }
    else {
        this.displayElement =   (
                <Row>
                    <Col>
                        <div className="d-grid gap-2">
                            {orders.map((order, index) => (
                                <Order key={index}  order={order} />
                            ))}
                        </div>
                    </Col>
                </Row>
        );
    }
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              User: <b>{user.username}</b>
            </Navbar.Text>
            <Nav.Link onClick={this.onLogout}>Logout</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          {this.displayElement}
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(Dashboard));