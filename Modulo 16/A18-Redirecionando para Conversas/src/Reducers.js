import { combineReducers } from './node_modules/redux';
import AuthReducer from './reducers/AuthReducer';
import ChatReducer from './reducers/ChatReducer';

const Reducers = combineReducers({
    auth:AuthReducer,
    chat:ChatReducer
});

export default Reducers;