// src/getChangedFields.ts
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function extractIncludeForKey(key, includePaths) {
  const subIncludes = /* @__PURE__ */ new Set();
  for (const path of includePaths) {
    if (path === key) continue;
    if (path.startsWith(`${key}.`)) {
      subIncludes.add(path.slice(key.length + 1));
    }
  }
  return subIncludes;
}
function getChangedFields(initial, changed, include) {
  const diff = {};
  const includeSet = new Set(include ?? []);
  for (const key of Object.keys(changed)) {
    const initialVal = initial[key];
    const changedVal = changed[key];
    const fullKeyIncluded = includeSet.has(key);
    const subInclude = extractIncludeForKey(key, includeSet);
    const isArray = Array.isArray(initialVal) && Array.isArray(changedVal);
    const isObject = isPlainObject(initialVal) && isPlainObject(changedVal);
    let hasChanged = false;
    if (isArray) {
      const sameLength = initialVal.length === changedVal.length;
      hasChanged = !sameLength || !initialVal.every((v, i) => v === changedVal[i]);
      if (hasChanged || fullKeyIncluded) {
        diff[key] = hasChanged ? changedVal : initialVal;
      }
      continue;
    }
    if (isObject) {
      const nestedDiff = getChangedFields(initialVal, changedVal, [...subInclude]);
      if (Object.keys(nestedDiff).length > 0) {
        diff[key] = nestedDiff;
      } else if (fullKeyIncluded) {
        diff[key] = initialVal;
      }
      continue;
    }
    hasChanged = initialVal !== changedVal;
    if (hasChanged) {
      diff[key] = changedVal;
    } else if (fullKeyIncluded) {
      diff[key] = initialVal;
    }
  }
  return diff;
}

export {
  getChangedFields
};
