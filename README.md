# mager

**Mager** koleksi kode siap pakai

> Maka sesungguhnya bersama kesulitan ada kemudahan

> ✨ mudah emosi ✨

---

## Table of Contents

- [Installation](#installation)
- [API](#api)
  - common
    - [getChangedFields](#getchangedfields)
    - [spellRupiah](#spellrupiah)

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

> Mendapatkan hanya apa yang berubah

`getChangedFields(initial, changed, include?)` adalah fungsi untuk membandingkan dua objek (initial dan changed) dan mengembalikan hanya properti yang benar-benar berubah — sangat berguna untuk PATCH request atau update minimal data.

```
getChangedFields( initial: Record, changed: Record, include?: string[] )
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
// → { id: 'user-123', name: 'Yatno Arthur' }

/**
 * catatan : id akan selalu disertakan (karena key `id` masuk ke dalam `include`)
 * jika tidak ada perubahan pada value id, value akan diambil dari initial, jika terdapat perubahan value akan diambil dari changed
 **/
```

---

### spellRupiah

> Ubah Angka Jadi Terbilang Bahasa Indonesia

`spellRupiah(value)` mengubah angka atau string angka menjadi format teks terbilang dalam bahasa Indonesia dan satuan rupiah. Cocok untuk tampilan laporan, kwitansi, nota, atau legalisasi angka. Skala angka hingga Desiliun!

```
spellRupiah(value: number | string): string
```

#### parameter

| Parameter | Tipe | Wajib | Deskripsi |
| --- | --- | --- | --- |
| `value` | `number \| string` | ✅ | Angka yang ingin diubah ke format terbilang. Bisa berupa bilangan desimal atau string. |

#### contoh

```tsx
import { spellRupiah } from 'mager/spellRupiah'

const hargaBarang = spellRupiah(14500)
// → "EMPAT BELAS RIBU LIMA RATUS RUPIAH"

const totalHarga = spellRupiah('1000001.05')
// → "SATU JUTA SATU KOMA NOL LIMA RUPIAH"

const profit = spellRupiah(-75)
// → "MINUS TUJUH PULUH LIMA RUPIAH"
```

---
