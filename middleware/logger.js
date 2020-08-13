module.exports = () => {
	return (req, res, next) => {
		const time = new Date().toISOString()
		console.log(`${time} ${req.method} ${req.url}`)

		// log everything and then go to the next router(?)
		next()
	}
}