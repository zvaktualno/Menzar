import PropTypes from "prop-types";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon htmlColor="#E74C3C" />,
        label: "Very Dissatisfied",
    },
    2: {
        icon: <SentimentDissatisfiedIcon htmlColor="#EC7063" />,
        label: "Dissatisfied",
    },
    3: {
        icon: <SentimentSatisfiedIcon htmlColor="#F4D03F" />,
        label: "Neutral",
    },
    4: {
        icon: <SentimentSatisfiedAltIcon htmlColor="#82E0AA" />,
        label: "Satisfied",
    },
    5: {
        icon: <SentimentVerySatisfiedIcon htmlColor="#2ECC71" />,
        label: "Very Satisfied",
    },
};

export default function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};
