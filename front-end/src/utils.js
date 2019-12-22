
import axios from 'axios';

export function generateUrl (path) {
	return path;
}

export function apiReq (endPoint, data, method, headers) {
  return new Promise ((res, rej) => {	
  	if(method === 'get' || method === 'delete') {
  		data = {
  			params: data,
  			headers
  		}
		}
		axios[method](endPoint, data, ).then((result) => {
	  let {data} = result;

	  if(data.status === false) {
			
		return rej(data);
	  }
		
	  return res(data);
	}).catch((err) => {
		return rej(err);
	});
  })
}

export function apiPost (endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, 'post', headers);
}

export function apiDelete (endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, 'delete', headers);
}

export function apiGet (endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, 'get', headers);
}

export function apiPut (endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, 'put', headers);
}

