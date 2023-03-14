import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../Login/LoginActions";
import Order from "../Order/Order";
import Accordion from "react-bootstrap/Accordion";
import ReviewModal from "./ReviewModal";
import axios from "axios";

function Dashboard(props) {
    const auth = props.auth;
    const user = auth.user;
    const [errors, setErrors] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [orders, setOrders] = useState([]);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [modalReviewData, setReviewModalData] = useState({ review: null, order_id: null, auth: auth });

    const apiUrl = "user/orders/";

    function onLogout() {
        props.logout();
    }

    function openReviewModal(order) {
        setReviewModalData({ review: order.review, order_id: order.pk, auth: auth });
        setShowReviewModal(true);
    }

    function closeReviewModal() {
        getUserOrderData();
        setShowReviewModal(false);
    }

    function getUserOrderData() {
        console.log("getUserOrderData")
        axios.get(apiUrl).then(
            (result) => {
                setIsLoaded(true);
                setOrders(result.data);
            },
            (error) => {
                setIsLoaded(false);
                setErrors(error);
            }
        );
    }

    useEffect(() => {
        getUserOrderData();
    }, []);

    var displayElement = null;

    if (errors) {
        displayElement = <div>Error: {errors.message}</div>;
    } else if (!isLoaded) {
        displayElement = <div>Loading...</div>;
    } else {
        displayElement = (
            <Accordion defaultActiveKey="0">
                {orders.map((order, index) => (
                    <Order
                        key={index}
                        accordionID={index}
                        order={order}
                        auth={props.auth}
                        openModal={openReviewModal}
                        refreshParent={getUserOrderData}
                    />
                ))}
            </Accordion>
        );
    }

    return (
        <div>
            <ReviewModal
                show={showReviewModal}
                refresh={setReviewModalData}
                close={closeReviewModal}
                data={modalReviewData}
            />
            <Navbar auth={props.auth} bg="light">
                <Navbar.Brand href="/">Domov</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        User: <b>{user.username}</b>
                    </Navbar.Text>
                    <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
            <Container>{displayElement}</Container>
        </div>
    );
}

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    logout,
})(withRouter(Dashboard));
