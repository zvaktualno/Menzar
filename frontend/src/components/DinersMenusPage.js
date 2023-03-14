import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { logout } from "./Login/LoginActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Menu from "./Menus/Menu";
import axios from "axios";

class DinerMenusPage extends Component {
    constructor(props) {
        super(props);
        this.splitPath = window.location.pathname.split("/");
        this.dinerName = this.splitPath[this.splitPath.length - 3];
        this.dinerDate = this.splitPath[this.splitPath.length - 2];
        this.apiUrl = "diner/" + this.dinerName + "/" + this.dinerDate + "/";
        this.state = {
            error: null,
            isLoaded: false,
            menus: [],
        };
        this.auth = this.props.auth;
    }
    onLogout = () => {
        this.props.logout();
    };
    refreshMenus = () => {
        axios.get(this.apiUrl).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    menus: result.data,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error: error,
                });
            }
        );
    };

    componentDidMount() {
        this.refreshMenus();
    }

    render() {
        const { user } = this.props.auth;
        const { error, isLoaded, menus } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <div className="d-grid gap-2">
                                {menus.map((menu, index) => (
                                    <Menu user={user} key={index} menu={menu} refresh={this.refreshMenus} />
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    logout,
})(withRouter(DinerMenusPage));
