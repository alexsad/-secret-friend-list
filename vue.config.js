module.exports = {
	pwa: {
		themeColor: '#800080'
	},
	publicPath: process.env.NODE_ENV === 'production'
		? '/secret-friend-list/'
		: '/'
}