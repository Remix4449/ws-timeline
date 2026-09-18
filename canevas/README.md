# Patch & télécommande — quatre canevas de refonte

Quatre propositions d'ergonomie pour les deux outils de l'application
[Patch](https://github.com/Remix4449/Patch) : le **patch** (poser des lignes
d'appareils, enchaîner les adresses, relever les circuits) et la
**télécommande de gradateurs** (appeler un gradateur, le voir s'allumer, noter
son circuit).

Chaque canevas est une page manipulable au doigt. Elles ne se combinent pas :
elles défendent quatre idées différentes de ce qui cloche aujourd'hui, et on en
choisit une.

Ouvrir [`index.html`](index.html) pour la présentation et la comparaison. Les quatre
canevas sont aussi publiés en atelier manipulable, sans rien installer :
<https://claude.ai/artifact/1qn1n47DEWXqUu2ESouk8C> (page privée, accessible au
propriétaire du dépôt).

| | Canevas | Thèse en une phrase |
| --- | --- | --- |
| A | [Pupitre](a-pupitre.html) | Ce qui commande ne défile jamais : liste en haut, dock fixe en bas. |
| B | [Relevé](b-releve.html) | Le travail est une boucle, pas un tableau : une question par écran, et ça avance tout seul. |
| C | [Plan 512](c-plan.html) | Un univers, ce sont 512 cases — il faut les voir, et pouvoir les déplacer au doigt. |
| D | [Feuille unique](d-feuille.html) | Le défaut est dans le modèle : le circuit est saisi deux fois et ne relie rien. |

Trois canevas de plus reprennent les deux pièces retenues — le tableau d'ajout
d'appareils et les rangées de liste du **D**, le relevé plein écran du **B** — et
ne changent que l'assemblage. Atelier :
<https://claude.ai/artifact/KN73n5Lw54juKaNFh1rE2G>

| | Canevas | Thèse en une phrase |
| --- | --- | --- |
| E | [Registre](e-registre.html) | Un registre par objet : appareils d'un côté, gradateurs de l'autre. |
| F | [Deux temps](f-deux-temps.html) | Ce n'est pas l'outil qui change, c'est la posture : préparer assis, relever debout. |
| G | [Circuits](g-circuits.html) | Le circuit organise l'écran : une carte par circuit, testable d'une touche. |

Un dernier canevas reprend la mini-télécommande et range tout dans une seule
liste à trois onglets, les deux actions passant par des volets. Atelier :
<https://claude.ai/artifact/Rf6LuQse1p5JUjG27KyQpT>

| | Canevas | Thèse en une phrase |
| --- | --- | --- |
| H | [Onglets](h-onglets.html) | Une liste à trois onglets ; le volet recouvre la liste à moitié au lieu de la remplacer. |

## Ce qu'on reproche à l'existant

Relevé sur la version actuelle de l'application (`patch-app/app/src/main/assets/www/index.html`,
fonctions `vDmx` et `vTel`) :

1. **Ce qui commande défile avec le reste.** Le clavier de la télécommande est
   une carte dans une page : descendre dans la feuille pour écrire un circuit
   le fait disparaître, alors que les deux servent en même temps. Au patch,
   le bouton d'export est sous cent lignes d'adresses.
2. **La saisie se fait dans des cases de 50 pixels.** Circuit et numéro de
   patch sont deux champs minuscules par appareil, au milieu d'une liste, et
   rien n'enchaîne d'un champ au suivant.
3. **Le geste réel n'est pas premier.** Appeler, regarder la scène, noter,
   passer au suivant : cette boucle n'existe nulle part comme telle.
4. **Le `✓` et le niveau se contredisent.** `+` et `−` valident d'abord la
   frappe en cours (`valider()`), puis changent le niveau : la même touche fait
   deux choses selon ce qui a été tapé avant.
5. **L'univers est invisible.** 512 canaux, et aucun moyen de voir la place
   restante, les trous, ni un chevauchement. Deux lignes peuvent se marcher
   dessus sans que rien ne le signale.
6. **Le circuit est saisi deux fois.** `PATCH.fiches[].circuit` d'un côté,
   `GRADA.fiches[].circuit` de l'autre, sans lien : l'application ne peut pas
   dire quel projecteur est alimenté par quel gradateur.
7. **Chaque frappe reconstruit l'écran.** Un réglage modifié relance tout le
   rendu ; le curseur est rattrapé au vol par un `data-focus`, l'état du volet
   des réglages par une variable globale `REG_OUVERT`. C'est le symptôme d'une
   structure à revoir, et les quatre canevas mettent à jour par morceaux.

## Ce qui est réel, ce qui ne l'est pas

- **Réels** : le calcul d'adressage enchaîné (y compris le passage à l'univers
  suivant quand un appareil ne tient plus dans 512 canaux), la détection des
  chevauchements, les correspondances Art-Net (net / sub / universe) et sACN
  (multicast `239.255.x.y`), les bibliothèques de modes et leur empreinte.
- **Simulés** : l'émission. `FLUX` dans `socle.js` compte ce qui partirait, rien
  n'est envoyé — une page web n'a accès ni aux sockets UDP ni au multicast. Dans
  l'application, ces mêmes gestes passent par `NET.emission()` et
  `Emetteur.java`, qui tient les trames à 30 Hz.
- **Non enregistré** : recharger une page repart des données de démonstration.

Les données d'appareils sont un extrait du parc, avec des modes plausibles.

## Manipuler

```
python3 -m http.server 8000     # depuis ce dossier
```

puis `http://localhost:8000/`. Un simple `file://` marche aussi selon le
navigateur, mais le serveur local évite les surprises.

Quelques raccourcis pour la revue :

- `a-pupitre.html#tel`, `b-releve.html#tel`, `c-plan.html#tel` ouvrent
  directement la télécommande ; `b-releve.html#patch` ouvre le plan de feu.
- Canevas A : le pavé est doublé au clavier physique — chiffres, `Entrée` pour
  appeler, `↑` `↓` pour le niveau, `←` `→` pour changer de gradateur.
- Canevas B : glisser l'écran à gauche ou à droite change de gradateur.
- Canevas C : attraper un bloc de la grille et le faire glisser déplace toute
  la ligne, canal par canal.
- Canevas D : `Entrée` dans un champ « circuit » enchaîne sur le suivant.

Ces pages sont écrites pour un téléphone tenu à une main : c'est là qu'il faut
les essayer pour savoir laquelle tient debout.

## Ensuite

Une fois le canevas choisi, la refonte se porte dans
[Remix4449/Patch](https://github.com/Remix4449/Patch), où vit l'application —
ce dossier n'est qu'un atelier de maquettes. Le canevas D est le seul qui
touche au modèle de données : le choisir implique une reprise des patchs et
feuilles déjà enregistrés sur les téléphones.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | présentation, critique, comparaison des quatre |
| `socle.css` | jetons de couleur et typographie, communs aux quatre |
| `socle.js` | données de démonstration, calculs DMX, flux simulé |
| `a-pupitre.html` · `b-releve.html` · `c-plan.html` · `d-feuille.html` | les quatre premiers canevas |
| `mix.css` · `mix.js` | les pièces retenues du D et du B, rendues réutilisables |
| `e-registre.html` · `f-deux-temps.html` · `g-circuits.html` | les trois mélanges |
| `h-onglets.html` | le canevas à onglets et volets |
