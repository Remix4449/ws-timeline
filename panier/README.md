# Panier Commun a déménagé

L'application vit maintenant dans son propre dépôt :
**<https://github.com/Remix4449/panier-commun>**, publiée sur
<https://remix4449.github.io/panier-commun/>.

Ce dossier n'en garde que deux fichiers, et aucun code applicatif :

| Fichier | Rôle |
| --- | --- |
| `index.html` | page de renvoi vers la nouvelle adresse |
| `sw.js` | retire l'ancien service worker et vide ses caches |

Les deux servent la même chose : un téléphone qui avait installé l'app depuis
`/ws-timeline/panier/` gardait la coquille hors ligne en cache et aurait
continué d'afficher une version dépassée. En passant ici, il se débarrasse de
ce cache et repart vers le bon dépôt. Une fois les deux téléphones du foyer
passés à la nouvelle adresse, ce dossier peut disparaître entièrement.

Les données ne sont pas concernées : elles vivent dans le `localStorage` du
téléphone et, si un foyer est configuré, dans sa base Firebase. La nouvelle
adresse retrouve le même foyer avec le même code.
