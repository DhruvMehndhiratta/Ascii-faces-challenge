import {  apiGet} from '../utils';

export function getProductsAPI(data) {
    const { page='' , limit='',sort='' } =data;
    return apiGet(`http://localhost:3000/products?_page=${page}&_limit=${limit}&_sort=${sort}`)
}