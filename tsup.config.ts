import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts', 'src/getChangedFields.ts', 'src/spellRupiah.ts'],
	format: ['esm'],
	dts: true,
	clean: true,
	outDir: 'dist'
})
