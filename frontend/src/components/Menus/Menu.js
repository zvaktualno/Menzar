import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const getMenuColor = (ordered) => {
    if (ordered) {
        return "success";
    } else {
        return "secondary";
    }
};

const Menu = (props) => {
    const menuID = props.menu.pk;
    const soupString = props.menu.soup.name;
    const dishString = props.menu.dish.name;

    const initialState = {
        menu_text: soupString == null ? soupString + " | " : dishString,
        menu_ordered: props.menu.ordered,
        menu_text_color: getMenuColor(props.menu.ordered),
    };

    const [state, setState] = useState(initialState);

    const orderMenu = (menu_pk) => {
        let ordered = false;
        if (state.menu_ordered) {
            return;
        } else {
            setState({
                menu_text: "Označevanje v teku...",
                menu_ordered: false,
                menu_text_color: "warning",
            });

            axios
                .post("user/order/", { menu_pk: menu_pk })
                .then((response) => {
                    ordered = true;
                    setState({
                        menu_text: "Označeno! Pa dober tek!",
                        menu_text_color: "success",
                        menu_ordered: ordered,
                    });
                })
                .catch((error) => {
                    ordered = false;
                    setState({
                        menu_text: "Za naročilo je potrebna prijava!",
                        menu_text_color: "danger",
                        menu_ordered: ordered,
                    });
                })
                .finally(() => {
                    setTimeout(() => {
                        setState({
                            menu_text: initialState.menu_text,
                            menu_ordered: ordered,
                            menu_text_color: getMenuColor(ordered),
                        });
                    }, 2000);
                });
        }
    };
    console.log(props.menu.stats);

    const displayRating = props.menu.stats.totalOrderAverage > 0;
    const rating = displayRating ? Math.round(props.menu.stats.totalOrderAverage * 100) / 100 : null;
    const ratingString = displayRating ? rating.toFixed(2) + "🌟" : "";

    const handleClick = () => {
        orderMenu(menuID);
    };

    useEffect(() => {}, [state]);

    return (
        <ButtonGroup size="lg" onClick={handleClick} disabled={true} style={{ width: "100%" }} className="mb-2">
            <Button variant={state.menu_text_color} className="col-10">
                {state.menu_text}
            </Button>

            <Button variant={state.menu_text_color} className="col-2 text-left">
                {ratingString}
            </Button>
        </ButtonGroup>
    );
};

export default Menu;
