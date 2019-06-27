import { combineReducers } from './node_modules/redux';
import AuthReducer from './reducers/AuthReducer';

const Reducers = combineReducers({
    auth:AuthReducer
});

export default Reducers;