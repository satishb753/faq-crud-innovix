import { combineReducers } from "redux";
import faqReducer from './faqReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    faq: faqReducer,
    error: errorReducer,
    auth: authReducer
});