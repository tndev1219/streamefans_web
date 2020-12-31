/**
 * Content loader
 */
import React from 'react';
import HashLoader from "react-spinners/HashLoader";

const ContentLoader = () => (
    <div className="iron-progress-bar d-flex justify-content-center align-items-center">
        <HashLoader
            size={50}
            color={"#00aff0"}
            loading={true}
        />
    </div>
);

export default ContentLoader;