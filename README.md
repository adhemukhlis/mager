# mager

**Mager** is my personal collection of my repetitive code that gives me hassle

---

## Table of Contents

- [Installation](#installation)
- [API](#api)
  - common
    - [axiosGroup](#axiosgroup)
  - NextJS
    - [routeGuard](#routeguard)

---

## Installation

`npm`

```shell
npm i mager
```

`yarn`

```shell
yarn add mager
```

## API

<br>

### axiosGroup

`axiosGroup( arrayOfRequest:array )` run axios request in Promise.All

```js
import axios from 'axios'
import { axiosGroup } from 'mager'

const getProfile = async () => {
	return axios.request({
		method: 'GET',
		url: '/api/profile/me'
	})
}
const getNotifications = async () => {
	return axios.request({
		method: 'GET',
		url: '/api/notifications'
	})
}

const [responseGetProfile, responseGetNotifications] = await axiosGroup([getProfile(), getNotifications()])

if (responseGetProfile.status === 200) {
	console.log(responseGetProfile.response)
} else {
	console.log(responseGetProfile.error.response)
}
if (responseGetNotifications.status === 200) {
	console.log(responseGetNotifications.response)
} else {
	console.log(responseGetNotifications.error.response)
}
```

---

### routeGuard

`routeGuard( allowed:array, redirectTo:string, returnValue:object )` function handler to validate some rules in array

```js
import { routeGuard } from 'mager/next'

export const getServerSideProps = async ({ req, query, ..._other }) => {
	const accessToken = req.session?.auth?.access_token
	const userRole = req.session?.auth?.role
	const isLoggedIn = !!accessToken
	const isSuperAdmin = userRole === 'super-admin'
	const validator = [isLoggedIn, isSuperAdmin]
	// if the validator contains a false value, routeGuard will redirect to /login (the value of the second param), otherwise routeGuard will pass the return value based on the value of the third param
	return routeGuard(validator, '/login', {
		props: { query }
	})
}
```
