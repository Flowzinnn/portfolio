// Depois do build: o GitHub Pages não conhece as rotas do React (/cases/..., /blog/...).
// Copiar o index.html para 404.html faz qualquer endereço abrir o app normalmente.
import { copyFileSync, writeFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
writeFileSync('dist/.nojekyll', '')
console.log('✓ 404.html e .nojekyll criados para o GitHub Pages')
