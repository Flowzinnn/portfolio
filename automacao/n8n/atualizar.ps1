# Atualiza o fluxo do n8n com a versão deste repositório, sem precisar escolher credenciais de novo.
# Uso (PowerShell, na pasta do projeto):  powershell -ExecutionPolicy Bypass -File automacao\n8n\atualizar.ps1
# Depois, no n8n (http://localhost:5678), abra o fluxo e clique em Publish.
$ErrorActionPreference = 'Stop'
$arquivo = Join-Path $PSScriptRoot 'wolf-solutions-monitor.json'
docker cp $arquivo n8n:/tmp/fluxo.json
docker exec n8n n8n import:workflow --input=/tmp/fluxo.json
Write-Host ''
Write-Host 'Fluxo atualizado. Agora abra http://localhost:5678, recarregue a pagina (F5), abra o fluxo e clique em Publish.' -ForegroundColor Green
