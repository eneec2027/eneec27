#!/usr/bin/env bash
# Verifica, sem browser, que a recolha de emails de um deploy está viva.
#
#   scripts/smoke-signup.sh [URL_BASE]          # por omissão https://eneec.pt
#   CRON_SECRET=... scripts/smoke-signup.sh     # faz também a escrita real
#
# Dois testes, porque falham por razões diferentes (vault › eneec/proximos-passos › 0.4):
#
# 1. O server action carrega? Chama o `signupEmail` com um email inválido de
#    propósito — não escreve nada — e exige a resposta "Email inválido.". Apanha
#    o 500 de 25/08, em que um export errado num ficheiro 'use server' partia o
#    módulo inteiro e o build passava.
# 2. A base de dados guarda? Só com CRON_SECRET: chama /api/health, que insere
#    e apaga um email-sentinela. Apanha o Supabase pausado de 12/08 e 01/09, em
#    que o módulo respondia bem e o insert falhava.
#
# Correr antes e depois de cada deploy. Sai com código ≠ 0 se algo falhar.
set -euo pipefail

BASE="${1:-https://eneec.pt}"
BASE="${BASE%/}"
fail=0

echo "→ $BASE"

# O id do action muda a cada deploy e vive nos chunks de JS da página, por isso
# descobre-se sempre, nunca se cola. Pode haver mais do que um id nos chunks;
# testa-se cada um até algum responder como o signupEmail.
chunks=$(curl -fsS "$BASE/pt" | grep -o '/_next/static/chunks/[^"]*\.js' | sort -u)
ids=$(for c in $chunks; do curl -fsS "$BASE$c" | grep -ho '"[0-9a-f]\{40,\}"' || true; done | tr -d '"' | sort -u)

if [ -z "$ids" ]; then
  echo "✗ 1. nenhum id de server action encontrado nos chunks de /pt"
  fail=1
else
  found=""
  for id in $ids; do
    res=$(curl -sS -X POST "$BASE/pt" \
      -H "Next-Action: $id" -H 'Content-Type: text/plain;charset=UTF-8' \
      --data '["isto-nao-e-um-email","v2_newsletter"]' -w '\n%{http_code}' || true)
    code=$(tail -n1 <<<"$res")
    if grep -q 'Email inválido' <<<"$res"; then found="$id"; break; fi
    last="HTTP $code"
  done
  if [ -n "$found" ]; then
    echo "✓ 1. signupEmail carrega e valida (action ${found:0:8}…)"
  else
    echo "✗ 1. nenhum action respondeu \"Email inválido.\" (último: ${last:-sem resposta})"
    fail=1
  fi
fi

if [ -n "${CRON_SECRET:-}" ]; then
  res=$(curl -sS "$BASE/api/health" -H "Authorization: Bearer $CRON_SECRET" -w '\n%{http_code}')
  code=$(tail -n1 <<<"$res")
  body=$(head -n -1 <<<"$res")
  if [ "$code" = "200" ]; then
    echo "✓ 2. a base de dados guarda — $body"
  else
    echo "✗ 2. /api/health respondeu $code — $body"
    fail=1
  fi
else
  echo "· 2. escrita real saltada (sem CRON_SECRET)"
fi

exit $fail
