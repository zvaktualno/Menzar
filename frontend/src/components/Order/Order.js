import axios from "axios";
import React from "react";
import { Card, Accordion, Button } from "react-bootstrap";

import IconContainer from "../Dashboard/Smiley";

const Order = (props) => {
    const order = props.order;
    const menu = order.menu;
    const diner = menu.diner.display_name;
    const dish = menu.dish.name;
    const soup = menu.soup.name;
    const review = order.review;
    const reviewAvailable = review !== null;
    const openModal = props.openModal;
    
    const accordionID = props.accordionID.toString();

    function deleteOrder(){
        const apiURL = "order/remove/";
        const data = {
            "order_pk": order.pk,
        };
        axios.delete(apiURL, { data: data }).then(setTimeout(() => {
            props.refreshParent();
        }, 1000 ));
    }
    
    const ratingIcon = reviewAvailable ? (
        <div>
            <p>{review.comment}</p>
            <IconContainer value={parseInt(review.rating)} />
            <br></br>
        </div>
    ) : "";
    
    // set up the new review button
    const newReviewButton = (
        <Button className="float-right mb-2 mr-2" onClick={() => openModal(order)}>Oceni kosilo</Button>
    );
    
    // set up the edit review button
    const editAvailable = reviewAvailable;
    const editButton = editAvailable ? (
        <Button className="float-right mb-2 mr-2" onClick={() => openModal(order)}>
            Uredi oceno
        </Button>) : "";
    
    const reviewButton = reviewAvailable ? editButton : newReviewButton;
    
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="light" eventKey={accordionID}>
                    {menu.date.split("-").reverse().join(".")} - Naročilo v {diner}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={accordionID}>
                <Card.Body>         
                    <p>{soup}</p>
                    <p>{dish}</p>
                    {ratingIcon}
                    <Button className="float-right mb-2" onClick={() => deleteOrder()}>
                        Izbriši naročilo
                    </Button>
                    {reviewButton}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};
export default Order;
