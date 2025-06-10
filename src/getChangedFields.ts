type PlainObject = Record<string, any>

function isPlainObject(value: any): value is PlainObject {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function extractIncludeForKey(key: string, includePaths: Set<string>): Set<string> {
	const subIncludes = new Set<string>()
	for (const path of includePaths) {
		if (path === key) continue
		if (path.startsWith(`${key}.`)) {
			subIncludes.add(path.slice(key.length + 1))
		}
	}
	return subIncludes
}

export function getChangedFields<T extends PlainObject>(initial: T, changed: T, include?: string[]): Partial<T> {
	const diff: { [K in keyof T]?: any } = {}
	const includeSet = new Set(include ?? [])

	for (const key of Object.keys(changed)) {
		const initialVal = initial[key]
		const changedVal = changed[key]
		const fullKeyIncluded = includeSet.has(key)
		const subInclude = extractIncludeForKey(key, includeSet)

		const isArray = Array.isArray(initialVal) && Array.isArray(changedVal)
		const isObject = isPlainObject(initialVal) && isPlainObject(changedVal)

		let hasChanged = false

		if (isArray) {
			const sameLength = initialVal.length === changedVal.length
			hasChanged = !sameLength || !initialVal.every((v, i) => v === changedVal[i])
			if (hasChanged || fullKeyIncluded) {
				diff[key as keyof T] = hasChanged ? changedVal : initialVal
			}
			continue
		}

		if (isObject) {
			const nestedDiff = getChangedFields(initialVal, changedVal, [...subInclude])
			if (Object.keys(nestedDiff).length > 0) {
				diff[key as keyof T] = nestedDiff
			} else if (fullKeyIncluded) {
				diff[key as keyof T] = initialVal
			}
			continue
		}

		hasChanged = initialVal !== changedVal

		if (hasChanged) {
			diff[key as keyof T] = changedVal
		} else if (fullKeyIncluded) {
			diff[key as keyof T] = initialVal
		}
	}

	return diff
}
