// frontend/src/utils/RequireAuth.js
import React from "react";
import { connect } from "react-redux";

const UserOptional = (Component) => {
    const UserOptionalComponent = (props) => {
        return (
            <div>
                <Component {...props} />
            </div>
        );
    };
    const mapStateToProps = (state, ownProps) => {
        const userPresent = state.auth !== null;
        return {
            isAuthenticated: userPresent ? state.auth.isAuthenticated : false,
            token: userPresent ? state.auth.token : null,
            own: ownProps,
        };
    };

    return connect(mapStateToProps)(UserOptionalComponent);
};

export default UserOptional;
