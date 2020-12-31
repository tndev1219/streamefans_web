import React from 'react';
import AvatarImg from '../../assets/avatar/Barrera.jpg';

const Suggestion = (props) => {
    return (
        <div
            style={{
                backgroundImage: `url("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg")`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '99%',
                height: 120,
                borderRadius: 10,
                border: '2px solid #fff',
                // marginBottom: 15,
            }}
        >
            <div style={{ position: 'relative', top: 60, bottom: 0, height: 60, width: '100%', backgroundColor: '#000', opacity: 0.5, borderRadius: '0px 0px 10px 10px', display: 'block' }}>
                <p style={{ position: 'relative', top: 10, left: 120, color: 'white' }}>
                    Marine
                </p>
                <p style={{ position: 'relative', top: -5, left: 120, color: 'white', fontSize: 14 }}>
                    @marinesings
                </p>
            </div>
            <img src={AvatarImg} alt='avatar' style={{ position: 'relative', width: 90, height: 90, borderRadius: 100, border: '2px solid #fff', top: -45, left: 15 }} />
            <div style={{ position: 'relative', top: -145, left: 10, height: 25, width: 40, backgroundColor: '#000', opacity: 0.5, borderRadius: 7, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <span style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Free</span>
            </div>
        </div>
    );
};

export default React.memo(Suggestion);