## Problema

As imagens do site usam pointers `.asset.json` que apontam para URLs no formato `/__l5e/assets-v1/{asset_id}/{filename}`. Esse endpoint (`/__l5e/`) é servido **exclusivamente pela infraestrutura de hospedagem da Lovable** (CDN interna em Cloudflare R2 com um router próprio). Quando você publica em outro lugar (Cloudflare Pages via GitHub), esse caminho retorna 404 — o site não tem quem responda por `/__l5e/*`.

Ou seja: os arquivos binários originais foram removidos do repo e substituídos por pointers que só funcionam dentro do domínio `*.lovable.app`.

## Opções para corrigir

**Opção A — Publicar na Lovable (recomendado, zero trabalho)**
Publique pelo botão Publish da Lovable e, se quiser, conecte seu domínio custom em Project Settings → Domains. As imagens funcionam imediatamente porque o CDN `/__l5e/` está ativo. Você continua desenvolvendo normalmente e o GitHub segue sincronizado apenas como backup/versionamento.

**Opção B — Reescrever as URLs para o CDN público absoluto**
Os assets também são acessíveis via URL absoluta no bucket R2 público da Lovable. Trocar cada `asset.url` (relativo `/__l5e/...`) para a URL absoluta pública faz o Cloudflare Pages servir uma página que carrega as imagens direto do CDN Lovable. Precisa:
1. Adicionar um helper que converte o `r2_key` do pointer para a URL absoluta pública do bucket.
2. Trocar todos os `import xxx from "@/assets/xxx.jpg.asset.json"` + `xxx.url` para usar esse helper.
3. Fazer o mesmo em `__root.tsx` (favicon/og se aplicável) e em qualquer `<img src=asset.url>`.

Risco: depende do bucket público continuar acessível de fora do domínio Lovable; se a Lovable mudar essa política, quebra.

**Opção C — Baixar as imagens de volta para o repo e servir localmente**
Reverter a otimização de assets: baixar cada arquivo do CDN, colocar em `src/assets/` (ou `public/`), e trocar imports do `.asset.json` para import direto do arquivo. Assim tudo é bundle-ado e servido pelo Cloudflare Pages, sem depender de nada externo.
1. Para cada `.asset.json`, baixar o binário da URL atual.
2. Salvar em `src/assets/<nome>` (ou `public/` para o favicon).
3. Substituir `import x from "./x.jpg.asset.json"; ... x.url` por `import x from "./x.jpg"; ... x` (bundler já dá URL).
4. Remover os arquivos `.asset.json`.

Vantagem: independência total do hosting. Custo: repo maior (~2 MB de imagens) e você perde a otimização de CDN da Lovable.

## Recomendação

Se o objetivo é só ter o site no ar rápido: **Opção A**. Se você quer manter o deploy no Cloudflare Pages como principal: **Opção C** (mais robusta que B).

Me diga qual caminho seguir e eu implemento.
