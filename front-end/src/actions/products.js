import types from '../types';

import { 
    getProductsAPI
} from '../api/products'

export const getProducts = (payload) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch({
      type: types.GET_PRODUCTS
    });
    getProductsAPI(payload)
      .then(res => {
        dispatch({
          type: types.GET_PRODUCTS_SUCCESS,
          payload: res
        });

        return resolve(res);
      })
      .catch(err => {
        dispatch({
          type: types.GET_PRODUCTS_FAILED
        });
        return reject(err);
      });
  });

  export const emptyProducts = () => dispatch =>
  new Promise((resolve, reject) =>
      dispatch({
          type: types.EMPTY_PRODUCTS,
          payload: []
      })
  );