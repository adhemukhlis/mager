# mager

**Mager** adalah koleksi pribadi saya dari kode-kode berulang yang membuat saya repot

---

## Table of Contents

- [Installation](#installation)
- [API](#api)
  - common
    - [getChangedFields](#getchangedfields)

---

## Installation

`npm`

```bash
npm i mager
```

`yarn`

```shell
yarn add mager
```

## API

<br>

### getChangedFields

`getChangedFields(initial, changed, include?)` adalah fungsi untuk membandingkan dua objek (initial dan changed) dan mengembalikan hanya properti yang benar-benar berubah — sangat berguna untuk PATCH request atau update minimal data.

```tsx
import { getChangedFields } from 'mager/getChangedFields'
const data = getChangedFields( initial, changed, include? )
```

#### parameter

| Parameter | Tipe                    | Wajib | Deskripsi                                                            |
| --------- | ----------------------- | ----- | -------------------------------------------------------------------- |
| `initial` | `Record<string, any>`   | ✅    | Objek sebelum perubahan                                              |
| `changed` | `Record<string, any>`   | ✅    | Objek hasil perubahan (input dari user)                              |
| `include` | `string[]` _(optional)_ | ❌    | Daftar key yang **tetap disertakan** meskipun nilainya tidak berubah |

---

#### contoh

```tsx
import { getChangedFields } from 'mager/getChangedFields'

const initialProfile = {
	id: 'user-123', // tetap dikirim
	name: 'Yatno',
	email: 'ytno@example.com',
	age: 25
}

const formInput = {
	id: 'user-123',
	name: 'Yatno Arthur', // berubah
	email: 'ytno@example.com', // tidak berubah
	age: 25 // tidak berubah
}

const payload = getChangedFields(initialProfile, formInput, ['id'])

console.log(payload)
// output : { id: 'user-123', name: 'Yatno Arthur' }

/**
 * catatan : id akan selalu disertakan (karena key `id` masuk ke dalam `include`)
 * jika tidak ada perubahan value id akan diambil dari initial, jika terdapat perubahan value akan diambil dari changed
 **/
```

---
