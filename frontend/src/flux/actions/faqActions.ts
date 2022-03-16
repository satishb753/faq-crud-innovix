import axios from "axios";
import { GET_FAQS, ADD_FAQ, DELETE_FAQ, FAQS_LOADING } from './types';
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { IFaq } from "../../types/interfaces";

export const getFaqs = () => (dispatch: Function) => {
    dispatch(setFaqsLoading());
    axios
        .get('/api/items')
        .then(res =>
            dispatch({
                type:GET_FAQS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addFaq = (faq: IFaq) => (
    dispatch: Function,
    getState: Function
) => {
    axios
        .post('/api/faqs', faq, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteFaq = (id: string) => (
    dispatch: Function,
    getState: Function
) => {
    axios
        .delete(`/api/faqs/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};