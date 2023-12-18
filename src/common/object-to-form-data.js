const objectToFormData = (obj) => {
	const formData = new FormData()
	const keys = Object.keys(obj)
	keys.forEach((key) => {
		formData.append(key, obj[key])
	})
	return formData
}
module.exports = objectToFormData
