export default {
	state: {
		    api_token: null,
		    user_id: null,
		    expiration: null
	},
	set(api_token) {
		localStorage.setItem('api_token', api_token)
	},
	remove() {
		     localStorage.removeItem('api_token')
	},
	getToken(){
             var api_token = localStorage.getItem('api_token')
             var user_id = parseInt(localStorage.getItem('user_id'))
             var expiration = parseInt(localStorage.getItem('expiration'))
             if(! api_token || ! user_id || ! expiration)
             	return null
             if(Date.now() > parseInt(expiration)){
             	this.remove()
             	return null
             }else
             return api_token
	},
	isAuthenticated() {
		          if(this.getToken())
		          	return true
		          else
		          	return false
	}
}