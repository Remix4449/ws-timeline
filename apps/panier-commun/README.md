# Panier Commun

Application mobile de courses et de repas, partagée entre deux téléphones.

- **Recettes** — tuiles lisibles, ajout de nouvelles recettes, case à cocher sur
  la tuile qui verse directement les ingrédients dans la liste de courses
  (et les retire quand on la décoche).
- **Liste de courses** — triée par rayon, barre de recherche pour ajouter à la
  volée avec la quantité (« 2 kg pommes de terre »), rayon deviné
  automatiquement, quantités fusionnées quand un ingrédient revient.
- **Semaine** — midi et soir sur sept jours, et un bouton qui envoie tous les
  repas planifiés dans les courses.

## Technique

`index.html` est le corps d'un Artifact Claude : pas de `<!doctype>`, `<html>`,
`<head>` ni `<body>` — ils sont ajoutés à la publication. Aucune dépendance,
une seule feuille de style et un seul script.

La synchronisation utilise la capacité `db` de l'Artifact (`capabilities: {db: {}}`) :
trois collections partagées, `recipes`, `shopping` et `plan`, suivies en direct
par `onSnapshot`. Si la capacité n'est pas disponible dans la vue courante,
l'app bascule sur `localStorage` (badge « Ce téléphone ») et reste utilisable
en solo.
