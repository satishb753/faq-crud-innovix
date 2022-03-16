import {
    GET_FAQS,
    ADD_FAQ,
    DELETE_FAQ,
    FAQS_LOADING
} from '../actions/types';
import { IAction, IFaq } from '../../types/interfaces';

const initialState = {
    faqs: [],
    loading: false
}

interface IState {
    faqs: IFaq[];
}

export default function (state: IState = initialState, action: IAction) {
    switch (action.type){
        case GET_FAQS:
            return {
                ...state,
                faqs: action.payload,
                loading: false
            }
        case DELETE_FAQ:
            return {
                ...state,
                faqs: state.faqs.filter(faq => faq._id !== action.payload)
            };
        case ADD_FAQ:
            return {
                ...state,
                faqs: [action.payload, ...state.faqs]
            };
        case FAQS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}