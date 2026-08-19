# Security — oefenapp (gepind)

Zelfstandige oefen-/leerapp voor het vak Security, oorspronkelijk gebouwd in een
andere Claude Code-sessie (desktop) en hier vastgelegd zodat het project ook uit
deze repo verder te bewerken is.

- **Bron:** `security-oefenapp.html` — één self-contained HTML-bestand
  (inline CSS + JS, geen externe dependencies, state in `localStorage`).
- **Gepubliceerd als artifact:** https://claude.ai/code/artifact/f4aa6a75-12e6-412e-9d8a-ddce3370d283
- **Inhoud:** 146 kaarten verdeeld over 12 hoofdstukken (inleiding, principes,
  symmetrische en asymmetrische encryptie, hashing/MAC/ondertekenen, algoritmen,
  certificaten, toepassingen, authenticatie, autorisatie/OAuth/PKCE, bronnen),
  met per kaart een uitleg, een doel-as (vertrouwelijkheid / integriteit /
  authenticatie / onweerlegbaarheid / sleutelbeheer / grondbegrip) en
  verwijzingen naar verwante kaarten. Daarnaast een zwaardere variant
  (`HARD` / `HARDQ`) met moeilijkere antwoordopties per kaart.
- **Voortgang:** wordt in `localStorage` bewaard, dus per browser/apparaat.
- **Studieplanner:** examendatum en rustdagen staan bovenaan het script
  (`EXAM`, `REST`); de app rekent daar de dagindeling en voortgang uit.

## Lokaal bekijken

Open `security-oefenapp.html` in een browser. Het bestand mist bewust
`<!doctype html>`, `<html>`, `<head>` en `<body>`: die worden bij het publiceren
als artifact toegevoegd. Browsers vullen ze zelf aan, dus lokaal openen werkt.

## Bijwerken van het gepubliceerde artifact

Pas `security-oefenapp.html` aan en publiceer met dezelfde artifact-URL
(`url`-parameter van de Artifact-tool), anders ontstaat er een nieuw artifact op
een nieuwe link.

Dit project staat los van de NBA-app in deze repo; het deelt er geen code mee.
