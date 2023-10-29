function routeGuard(allowed, redirectTo, props) {
	var _allowed = !allowed.includes(false)
	return !_allowed
		? {
				redirect: {
					destination: redirectTo,
					permanent: false
				}
		  }
		: props
}
module.exports = routeGuard
