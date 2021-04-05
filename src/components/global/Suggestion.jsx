import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import appConfig from '../../constants/AppConfig';

const Suggestion = (props) => {
    const history = useHistory();

    return (
        <div
            style={{
                backgroundImage: `url(${appConfig.URL}${props.userInfo.header_image})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '99%',
                height: 120,
                borderRadius: 10,
                border: '2px solid #fff',
                cursor: 'pointer',
            }}
            onClick={() => history.push(`/profile/${props.userInfo.username}`)}
        >
            <div style={{ position: 'relative', top: 60, bottom: 0, height: 60, width: '100%', backgroundColor: '#000', opacity: 0.5, borderRadius: '0px 0px 10px 10px', display: 'block' }}>
                <p style={{ position: 'relative', top: 10, left: 120, color: 'white' }}>
                    {props.userInfo.display_name}
                </p>
                <p style={{ position: 'relative', top: -5, left: 120, color: 'white', fontSize: 14 }}>
                    {`@${props.userInfo.username}`}
                </p>
            </div>
            <img src={`${appConfig.URL}${props.userInfo.avatar}`} alt='avatar' style={{ position: 'relative', width: 90, height: 90, borderRadius: 100, border: '2px solid #fff', top: -45, left: 15 }} />
            <div style={{ position: 'relative', top: -145, left: 10, height: 25, width: 40, backgroundColor: '#000', opacity: 0.5, borderRadius: 7, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <span style={{ color: 'white', fontSize: 12, fontWeight: 500 }}>Free</span>
            </div>
        </div>
    );
};

Suggestion.propTypes = {
    userInfo: PropTypes.object,
};

export default React.memo(Suggestion);