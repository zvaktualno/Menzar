import * as React from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import IconContainer from "./Smiley";

const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
        color: theme.palette.action.disabled,
    },
}));

export default function RadioGroupRating(props) {
    return (
        <StyledRating
            name="highlight-selected-only"
            value={props.value}
            IconContainerComponent={IconContainer}
            onChange={props.onChange}
            highlightSelectedOnly
            sx={{ fontSize: props.size }}
        />
    );
}
