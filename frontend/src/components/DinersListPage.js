import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import Diner from "./Diner/Diner";

const DinerListPage = (props) => {
    const [state, setState] = useState({
        error: null,
        isLoaded: false,
        diners: [],
    });
    function dinerSortByFavorite(a, b) {
        if (a.favorite) {
            return -1;
        }
        if (b.favorite) {
            return 1;
        }
        return -1;
    }

    function renderDiners() {
        axios.get("diners/").then(
            (result) => {
                setState({
                    isLoaded: true,
                    diners: result.data.sort(dinerSortByFavorite), // Sort diners by favorite
                });
            },
            (error) => {
                setState({
                    isLoaded: true,
                    error,
                });
            }
        );
    }

    useEffect(() => {
        renderDiners();
    }, []);

    const { error, isLoaded, diners } = state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container>
                <Row>
                    {diners.map((diner, index) => (
                        <Diner key={index} displayFavorite={props.isAuthenticated} diner={diner} />
                    ))}
                </Row>
            </Container>
        );
    }
};

export default DinerListPage;
