# TimeTravel Agency — Webapp Interactive

Webapp d'une agence de voyage temporel de luxe (fictive), mettant en scène
l'agence et ses trois destinations : **Paris 1889**, **le Crétacé (-65 M)** et
**Florence 1504**. Projet pédagogique — Ynov Campus, Mastère 2.

**Membres du groupe :** Roelens Jean . Refeyton Axelle . Nguyen Yann
> ⚠️ Remplacez la ligne ci-dessus (et le bloc « Équipe » dans le pied de page du site, fichier `index.html`) par les noms et prénoms des 4 membres.

---

## 🛠️ Stack technique

- **HTML5 / CSS3 / JavaScript vanilla** — aucun build, aucune dépendance à installer
- **Google Fonts** — Cormorant Garamond (titres) × Jost (texte)
- **Canvas API** — champ d'étoiles animé du hero
- **IntersectionObserver** — animations au scroll & compteurs
- **Hébergement : GitHub Pages**

Choix d'un site 100 % statique et sans framework : déploiement immédiat sur
GitHub Pages, zéro configuration, chargement rapide.

## ✨ Fonctionnalités

- **Page d'accueil (hero)** avec vidéo de fond (ou animation de secours) et titre animé
- **Présentation de l'agence** avec compteurs animés
- **Galerie des 3 destinations** — cartes interactives + fiche détaillée (modale) par époque
- **Chatbot IA « Augustin »** — assistant conversationnel (bulle flottante en bas à droite)
- **Quiz « Votre Époque »** — 4 questions qui recommandent une destination personnalisée
- **Formulaire de réservation** — sélection destination/date + validation automatisée
- **Design responsive** (mobile-first) et animations subtiles au scroll

## 🤖 IA utilisées (transparence)

- **Code** : généré et itéré avec Claude (Anthropic).
- **Chatbot** : moteur conversationnel **scripté** par défaut (intentions + persona),
  fonctionne sans clé et sans serveur — idéal pour un hébergement statique.
  Un **mode IA en direct optionnel** est intégré : via l'icône ⚙ du chatbot, on peut
  coller une clé **OpenRouter** ou **Mistral** pour des réponses générées en temps réel
  (la clé reste en mémoire de session, n'est jamais publiée ni stockée dans le dépôt).
- **Visuels / vidéos** : à intégrer dans `assets/` (générés lors du Projet 1).

## 📦 Structure du projet

```
timetravel-agency/
├── index.html          # page unique
├── css/style.css       # thème "Chronos Atlas" (art-déco luxe)
├── js/app.js           # interactions, destinations, quiz, réservation, chatbot
├── assets/             # vos images / vidéos (voir assets/README.txt)
│   ├── hero-poster.svg
│   └── README.txt
├── .nojekyll
└── README.md
```

## ▶️ Lancer en local

Aucune installation. Ouvrez simplement `index.html` dans un navigateur,
ou servez le dossier :

```bash
# Python
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## 🚀 Déploiement sur GitHub Pages

1. Créez un dépôt GitHub (ex. `timetravel-agency`) et poussez **le contenu de ce dossier à la racine** :
   ```bash
   git init
   git add .
   git commit -m "TimeTravel Agency — webapp"
   git branch -M main
   git remote add origin https://github.com/<votre-compte>/timetravel-agency.git
   git push -u origin main
   ```
2. Sur GitHub : **Settings → Pages → Build and deployment**
   - *Source* : **Deploy from a branch**
   - *Branch* : **main** / **/ (root)** → **Save**
3. Patientez ~1 min. L'URL publique apparaît en haut de la page Pages :
   `https://<votre-compte>.github.io/timetravel-agency/`

> Tous les chemins sont **relatifs**, le site fonctionne donc directement
> dans un sous-dossier de projet GitHub Pages.

## 🖼️ Ajouter vos visuels

Voir `assets/README.txt`. En résumé : déposez `paris.jpg`, `cretaceous.jpg`,
`florence.jpg` (et optionnellement `hero.mp4`) dans `assets/`. Le site les
détecte automatiquement ; sans eux, des visuels dégradés élégants s'affichent.

## 📄 Licence

Projet pédagogique — M2 Digital & IA, Ynov Campus. Usage non commercial.
