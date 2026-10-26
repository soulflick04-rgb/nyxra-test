# Nyxra — Digital Atelier

A complete responsive Nyxra agency website, visually reconstructed from Forge Automotive's public presentation. Built with dependency-free HTML, CSS and JavaScript.

## Run

```sh
npm run dev
```

Open http://127.0.0.1:4173. `npm run check` validates JavaScript syntax; `npm run build` refreshes direct-entry route documents in `dist/`. The contents of `dist/` can be served by any static host.

## Included

- Intro with cursor image trail and session-only entry memory.
- Cinematic generated hero, staggered word entrance, scroll zoom and crossfade.
- Full-screen keyboard-accessible navigation and page transitions.
- Editorial approach sections, sticky four-service sequence, image hover motion, continuous business-type marquee and reveal animation.
- Home, services, concept portfolio, packages, studio, contact, privacy and terms pages, plus portfolio alias and a 404 page.
- Three real Nyxra demo previews and outbound demo links.
- Package preselection in the contact form, validation, consent, loading/timeout/error states and reduced-motion support.

## Content and assets

Verified on 26 October 2026 using https://nyxra.online/ (the apex of the user-supplied www.nyxra.online). Services, package prices, team copy, contact endpoint and policy information are based on that live site. Examples are clearly described as illustrative concepts rather than client work.

Reference design: https://forgeautomotive.co.uk/. Source inspection used the user-requested https://github.com/morluto/rea toolkit (cloned locally at `E:\Temp\rea`). REA 6.8.0 analyzed the public 86,400-byte homepage bundle: 25,972 AST nodes, 35 findings and no parse failures. Reference evidence is saved outside the deployable site at `E:\Temp\forge-research\ANALYSIS.md` and `E:\Temp\forge-rea-evidence-success.json`.

Fonts `editorial-ultralight.woff2`, `editorial-light.woff2`, `editorial-ultralight-italic.woff2`, and `geist.woff2` were retrieved from the reference's public CSS/font URLs. The original asset rights remain with their owners. Original Forge automotive photos, video, branding and text are not included in the Nyxra site.

`assets/nyxra-mark.svg` and the three `*-preview.jpg` files come from the existing Nyxra site. `assets/nyxra-hero.png` is custom artwork generated with the built-in Imagegen tool; its exact prompt is in `IMAGE_PROMPT.md`. Generated screen imagery is illustrative; the concept links show Nyxra's actual demos.

## Contact form

Uses the same public FormSubmit recipient as Nyxra: `supportnyxra@gmail.com`. It sends only when a visitor explicitly submits a valid form and gives consent. The third-party endpoint may require activation for a new origin. No real enquiry was sent during development. Error and timeout states preserve the visitor's input and provide the public email alternative.

## Hosting

### Vercel

Import this repository with the repository root as Root Directory. `vercel.json` selects the Other/static preset, runs `npm run build`, and publishes `dist`. Generated route directories support direct links such as `/contact/` and `/services/`. No serverless function is required.

The development HTTP server is intentionally located at `scripts/preview.mjs` so framework detection does not mistake it for the deployed application. Run it locally with `npm run dev` only.

### Sites

The tracked `.openai/hosting.json` holds the selected Sites identity and static directory. Publishing uses the Sites source helper and exact committed source. This is a separate private Site; it does not replace www.nyxra.online or alter its DNS.
