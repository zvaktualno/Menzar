import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import EatImage from "./images/undraw_Eating_together_re_ux62.png";
import ProfileImage from "./images/undraw_Personal_site_re_c4bp2.png";

const imageStyle = {
    width: "100%",
    height: "80%",
};
const Home = (props) => {
    return (
        <Container>
            <div className="row">
                <Card className="my-card col-5 mx-4 my-4">
                    <Link to={"/diners/"} style={{ textDecoration: "none", color: "black" }}>
                        <Card.Img src={EatImage} style={imageStyle} />
                        <Card.Body>
                            <Card.Title className="text-center">Vstopi v menzo</Card.Title>
                        </Card.Body>
                    </Link>
                </Card>
                <Card className="my-card col-5 mx-4 my-4">
                    <Link to={"/dashboard/"} style={{ textDecoration: "none", color: "black" }}>
                        <Card.Img src={ProfileImage} style={imageStyle} />
                        <Card.Body>
                            <Card.Title className="text-center">Profil</Card.Title>
                        </Card.Body>
                    </Link>
                </Card>
            </div>
        </Container>
    );
};

export default Home;
