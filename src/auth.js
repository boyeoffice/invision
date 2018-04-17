export default {
	set(api_token, user_id, expiration) {
		localStorage.setItem('api_token', api_token)
	},
	remove() {
		     localStorage.removeItem('api_token')
	},
	getToken(){
             var api_token = localStorage.getItem('api_token')
             return api_token
	},
	isAuthenticated() {
		          if(this.getToken())
		          	return true
		          else
		          	return false
	}
}