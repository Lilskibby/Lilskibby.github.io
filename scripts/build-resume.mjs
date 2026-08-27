// Exports resume/resume.docx -> public/resume.pdf using LibreOffice
// headless, so the .docx (not the PDF) is the single source of truth.
//
// - If resume/resume.docx doesn't exist, this is a no-op (nothing to do
//   yet, or you're intentionally not using this pipeline).
// - If it exists but LibreOffice ("soffice") isn't installed, or the
//   conversion fails for any reason, this warns and continues rather
//   than failing the whole site build — a broken résumé export
//   shouldn't take down the rest of the deploy.
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = join(root, 'resume', 'resume.docx')
const OUT_DIR = join(root, 'public')
const sofficeBin = process.platform === 'win32' ? 'soffice.exe' : 'soffice'

if (!existsSync(SOURCE)) {
  console.log('[resume] resume/resume.docx not found — skipping PDF export.')
  process.exit(0)
}

try {
  execFileSync(
    sofficeBin,
    ['--headless', '--convert-to', 'pdf', '--outdir', OUT_DIR, SOURCE],
    { stdio: 'inherit' },
  )
  console.log('[resume] Exported public/resume.pdf from resume/resume.docx')
} catch (err) {
  console.warn(
    '[resume] Could not export resume.docx to PDF (LibreOffice/"soffice" missing or conversion failed).',
  )
  console.warn(`[resume] ${err.message || err}`)
  console.warn('[resume] Continuing build without regenerating public/resume.pdf.')
}
