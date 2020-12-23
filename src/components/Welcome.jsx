import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { useGlobalAction } from '../store/slices/global.slice';
import { useASelector } from '../utilities/recipies.util';

const Welcome = ({ name }) => {
  const loading = useASelector((state) => state.global.loading, []);
  const setLoading = useGlobalAction('setLoading');

  const onToggle = useCallback(() => {
    setLoading(!loading);
  }, [loading]);

  return (
    <>
      <h1>Welcome to {name}!</h1>
      <h3>Loading: {loading ? 'true' : 'false'}</h3>
      <button onClick={onToggle}>Toggle</button>
    </>
  );
};

Welcome.propTypes = {
  name: PropTypes.string,
};

export default React.memo(Welcome);
