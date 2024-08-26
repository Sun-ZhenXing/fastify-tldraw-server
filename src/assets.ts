import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { Readable } from 'node:stream'

const DIR = resolve('./.assets')

export async function storeAsset(id: string, stream: Readable) {
	await mkdir(DIR, { recursive: true })
	await writeFile(join(DIR, id), stream)
}

export async function loadAsset(id: string) {
	return await readFile(join(DIR, id))
}
