import axios from "axios";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import DinerInfo from "./DinerData/DinerInfo";
import FavoriteFab from "./FavoriteFab";

const Diner = (props) => {
    const diner = props.diner;
    const dinerInfo = DinerInfo(diner.name);
    const dinerFavorite = diner.favorite === true;
    const displayFavorite = props.displayFavorite;
    const [isFavorite, setIsFavorite] = useState(dinerFavorite);

    function handleClick() {
        const changeToFavorite = !isFavorite;
        const apiURL = "favorite/diner";
        const data = {
            diner: diner.name,
            favorite: changeToFavorite,
        };
        if (changeToFavorite) {
            axios
                .post(apiURL, data)
                .then((response) => {
                    setIsFavorite(changeToFavorite);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.delete(apiURL, { data: data }).then((response) => {
                setIsFavorite(changeToFavorite);
            });
        }
    }

    return (
        <Card className="my-card col-5 mx-4 my-4">
            <FavoriteFab isFavorite={isFavorite} display={displayFavorite} onClick={handleClick} />
            <Link to={"/diner/" + diner.name + "/"} style={{ textDecoration: "none", color: "black" }}>
                <Card.Img variant="top" src={dinerInfo.image} />
                <Card.Body>
                    <Card.Title>{diner.display_name}</Card.Title>
                    <Card.Text>{dinerInfo.description}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
};

export default Diner;
