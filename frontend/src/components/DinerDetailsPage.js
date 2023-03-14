import React from "react";
import { Container, Button } from "react-bootstrap";

const DinerDetailsPage = (props) => {
    const splitPath = window.location.pathname.split("/");
    const dinerName = splitPath[splitPath.length - 2];

    const displayDates = ["13-10-2022", "14-10-2022", "17-10-2022"];

    return (
        <Container>
            <Button href={"/diner/" + dinerName + "/today/"} size="lg" variant="dark" className="mb-2 col-12" mb="2">
                Današnji meni
            </Button>
            {displayDates.map((date, index) => (
                <Button
                    key={index}
                    href={"/diner/" + dinerName + "/" + date + "/"}
                    size="lg"
                    variant="dark"
                    className="mb-2 col-12"
                    mb="2"
                >
                    Menu za {date.replaceAll("-", ".")}
                </Button>
            ))}
        </Container>
    );
};

export default DinerDetailsPage;
