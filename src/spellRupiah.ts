/* ---------- KAMUS ANGKA ---------- */
const UNITS = ['', 'SATU', 'DUA', 'TIGA', 'EMPAT', 'LIMA', 'ENAM', 'TUJUH', 'DELAPAN', 'SEMBILAN']
const TENS = [
	'',
	'SEPULUH',
	'DUA PULUH',
	'TIGA PULUH',
	'EMPAT PULUH',
	'LIMA PULUH',
	'ENAM PULUH',
	'TUJUH PULUH',
	'DELAPAN PULUH',
	'SEMBILAN PULUH'
]
const TEENS = [
	'SEPULUH',
	'SEBELAS',
	'DUA BELAS',
	'TIGA BELAS',
	'EMPAT BELAS',
	'LIMA BELAS',
	'ENAM BELAS',
	'TUJUH BELAS',
	'DELAPAN BELAS',
	'SEMBILAN BELAS'
]

/* Skala ribuan (0 = “satuan”, 1 = “ribu”, … 11 = “desiliun”) */
const SCALES = [
	'',
	'RIBU',
	'JUTA',
	'MILIAR',
	'TRILIUN',
	'KUADRILIUN',
	'KUINTILIUN',
	'SEKSTILIUN',
	'SEPTILIUN',
	'OKTILIUN',
	'NONILIUN',
	'DESILIUN'
] as const

/* ---------- UTILITAS ---------- */
const spellThreeDigits = (num: number): string => {
	if (num === 0) return ''

	let result = ''
	const hundreds = Math.floor(num / 100)
	const remainder = num % 100

	/* Ratusan */
	if (hundreds > 0) {
		result += hundreds === 1 ? 'SERATUS' : `${UNITS[hundreds]} RATUS`
	}

	/* Puluhan & Satuan */
	if (remainder > 0) {
		if (result) result += ' '

		if (remainder < 10) {
			result += UNITS[remainder]
		} else if (remainder < 20) {
			result += TEENS[remainder - 10]
		} else {
			const tens = Math.floor(remainder / 10)
			const units = remainder % 10
			result += TENS[tens] + (units ? ` ${UNITS[units]}` : '')
		}
	}

	return result
}

const spellDecimalPart = (dec: string): string =>
	dec
		.split('')
		.map((d) => UNITS[parseInt(d, 10)])
		.join(' ')

/* ---------- FUNGSI UTAMA ---------- */
export const spellRupiah = (value: number | string): string => {
	const [intStrRaw, decStr] = value.toString().split('.') // pakai let
	let _intStrRaw = intStrRaw
	const isNegative = intStrRaw.startsWith('-')
	if (isNegative) _intStrRaw = intStrRaw.slice(1) // buang tanda '-'

	let intStr = _intStrRaw.replace(/^0+/, '') || '0'

	/* ----- 0 kasus khusus ----- */
	if (intStr === '0') {
		const nol = decStr ? `NOL KOMA ${spellDecimalPart(decStr)} RUPIAH` : 'NOL RUPIAH'

		return isNegative ? `MINUS ${nol}` : nol
	}

	/* ----- pecah per 3 digit, eja, dsb. (sama dengan kode Anda) ----- */
	const groups: number[] = []
	while (intStr.length) {
		groups.unshift(parseInt(intStr.slice(-3), 10))
		intStr = intStr.slice(0, -3)
	}

	const parts: string[] = []
	const lastIdx = groups.length - 1

	groups.forEach((g, idx) => {
		if (g === 0) return
		const scaleIdx = lastIdx - idx
		if (scaleIdx === 1 && g === 1) {
			parts.push('SERIBU')
		} else {
			parts.push(SCALES[scaleIdx] ? `${spellThreeDigits(g)} ${SCALES[scaleIdx]}` : spellThreeDigits(g))
		}
	})

	let text = parts.join(' ')
	if (decStr) text += ` KOMA ${spellDecimalPart(decStr)}`

	const finalText = `${text} RUPIAH`

	return isNegative ? `MINUS ${finalText}` : finalText
}

/* ---------- CONTOH PAKAI ---------- */
// console.log(spellRupiah('1234567890123456789012345678901.89'));
// -> "SATU NONILIUN DUA RATUS TIGA PULUH EMPAT OKTILIUN ... DELAPAN RUPIAH"
