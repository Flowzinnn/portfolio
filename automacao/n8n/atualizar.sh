#!/bin/sh
# Atualiza o fluxo do n8n com a versão deste repositório, sem precisar escolher credenciais de novo.
# Uso: sh automacao/n8n/atualizar.sh   — depois, no n8n, abra o fluxo e clique em Publish.
set -e
cd "$(dirname "$0")"
docker cp wolf-solutions-monitor.json n8n:/tmp/fluxo.json
docker exec n8n n8n import:workflow --input=/tmp/fluxo.json
echo "Fluxo atualizado. Abra http://localhost:5678, recarregue (F5), abra o fluxo e clique em Publish."
