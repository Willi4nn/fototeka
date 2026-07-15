<!-- BEGIN:project-specific-rules -->

# Regras Absolutas do Projeto: Foto Teka

Você está codificando um site institucional de alta conversão. Siga estas regras estritamente:

## 1. Stack Tecnológica Obrigatória

- **Framework:** Next.js 16.2.10 (App Router APENAS). NUNCA use o Pages Router.
- **React:** 19.2.4. Use componentes de servidor (Server Components) por padrão. Use `'use client'` apenas nas extremidades (folhas da árvore) quando precisar de estado (`useState`) ou interatividade no navegador.
- **Estilização:** Tailwind CSS v4. NÃO use `tailwind.config.js`. Todas as variáveis estão configuradas via `@theme` no `app/globals.css`.

## 2. Identidade Visual (Tailwind v4)

Sempre utilize as classes utilitárias baseadas nas seguintes variáveis nativas já configuradas:

- Fundo Principal (Bege): `bg-brand-beige` ou `text-brand-beige`
- Texto/Contornos (Marrom Escuro): `text-brand-darkbrown` ou `bg-brand-darkbrown`
- Destaques/CTAs (Terracota): `bg-brand-terracotta` ou `text-brand-terracotta`
- Secundários/Bordas (Marrom Médio): `border-brand-midbrown` ou `bg-brand-midbrown`

## 3. Tipografia

- Para textos de corpo e leitura, use a classe padrão do Tailwind (já mapeada para a fonte Jost): `font-sans`.
- Para Títulos, Cabeçalhos e Slogans, use o utilitário customizado da fonte Pesto Mafio: `font-pesto uppercase`.

## 4. Otimização de Imagens

- NUNCA use a tag HTML `<img>`.
- Use EXCLUSIVAMENTE o componente `<Image>` importado de `next/image`.
- Todas as imagens de galeria ou hero devem ter as propriedades `width`, `height` (ou `fill` com `object-fit`), `alt` descritivo focado em SEO local (Patos de Minas) e, se possível, a propriedade `placeholder="blur"`.

## 5. Estrutura de Código Limpa

- Não crie aninhamentos profundos no Tailwind.
- Mantenha o código limpo e crie pequenos componentes na pasta `/components` (ex: `Watermark.tsx`, `Hero.tsx`, `Gallery.tsx`) em vez de páginas gigantescas.
- Importações devem usar o alias absoluto: `@/components/...`

<!-- END:project-specific-rules -->
