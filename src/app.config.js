import Auth from './auth'
export const APIENDPOINT = "https://api.intg.hakkyo.org";

export const headers = function(){
	const tokenData = Auth.getToken
	const headers = {
		//'Accept':'application/json',
		  'Authorization' : 'Token ' + tokenData
	}
	return headers
}