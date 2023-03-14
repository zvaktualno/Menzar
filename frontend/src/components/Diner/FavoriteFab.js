import { Fab, Icon } from "@mui/material";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./Diner.css";

const FavoriteFab = ({ isFavorite, display, onClick }) => {
    console.log(isFavorite);
    const favoriteButton = display ? (
        <Icon
            className={isFavorite ? "favorite-icon filled" : "favorite-icon empty"}
            component={isFavorite ? FavoriteIcon : FavoriteBorderIcon}
        />
    ) : null;

    return (
        <Fab
            onClick={onClick}
            className="favorite-fab"
            style={{
                position: "absolute",
                top: 10,
                right: 10,
            }}
            aria-label="like"
        >
            {favoriteButton}
        </Fab>
    );
};

export default FavoriteFab;
