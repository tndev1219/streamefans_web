import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * to use when returning a primitive value from
 * the selector
 * @prop props required when selector has value in closure,
 * else it wont re-render when said value changes
 * eg: state => state.server[serverKey].status; serverKey is the prop
 */
export const useASelector = (selector, props) => useSelector(useCallback(selector, [props]));

/**
 * ** Usage **
 * const useAction = makeHook(authActions)
 * const action = useAction('confirmSignUp')
 */
export function makeActionHook(actions) {
  return (action, isNull = false) => {
    const dispatch = useDispatch();
    const act = actions[action];
    const callback = isNull ? () => dispatch(act()) : (payload) => dispatch(act(payload));
    return useCallback(callback, []);
  };
}
