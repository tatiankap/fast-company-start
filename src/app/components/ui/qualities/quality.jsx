import React from "react";
import PropTypes from "prop-types";
// import { useQualities } from "../../../hooks/useQualities";
const Quality = ({ _id, color, name }) => {
    // const { getQuality } = useQualities();
    // const { _id, color, name } = getQuality(id);
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
};
Quality.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string,
    name: PropTypes.string
};

export default Quality;
