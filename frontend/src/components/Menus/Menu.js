import React, { useEffect, useState, } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

const Menu = (props) => {
    const diner = props.menu.diner;
    const menuID = props.menu.id;
    const soupString = props.menu.soup;
    const rating = props.menu.rating == null ? null : ((Math.round(props.menu.rating * 100) / 100).toFixed(2));
    const dishString = props.menu.dish;
    console.log(rating)

    const dishDisplayString = (soupString == null) ? (soupString + " | ") : "" + dishString;
    const ratingDisplayString = (rating == null) ? "" : rating + "🌟";
    
    const loadingText = "Pa dober tek!";
    
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        if (isLoading) {
        simulateNetworkRequest().then(() => {
            setLoading(false);
        });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);
    
    return (
        <ButtonGroup
            size="lg"
            onClick={!isLoading ? handleClick : null}
            disabled={isLoading}
            style={{ width: "100%" }}
            className="mb-2"
        >
            <Button
                variant={isLoading ? "success" : "secondary"}
                className="col-10"
            >
            {isLoading ? loadingText : dishDisplayString}
            </Button>
            
            <Button
                variant={isLoading ? "success" : "secondary"}
                className="col-2 text-left"
            >
            {isLoading ? "" : ratingDisplayString}
            </Button>
        </ButtonGroup>
    )
    
}
export default Menu;