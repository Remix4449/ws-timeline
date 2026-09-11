/* Panier Commun a déménagé vers https://remix4449.github.io/panier-commun/
   Ce service worker ne remplace plus rien : il prend la place de l'ancien,
   vide ses caches et se retire. Les téléphones qui gardaient la vieille
   coquille hors ligne repassent ainsi par le réseau, et tombent sur la page
   de redirection. */
self.addEventListener("install", function(ev){ self.skipWaiting(); });

self.addEventListener("activate", function(ev){
  ev.waitUntil(
    caches.keys()
      .then(function(noms){ return Promise.all(noms.map(function(n){ return caches.delete(n); })); })
      .then(function(){ return self.registration.unregister(); })
      .then(function(){ return self.clients.matchAll({type:"window"}); })
      .then(function(clients){ clients.forEach(function(c){ c.navigate(c.url); }); })
      .catch(function(){})
  );
});
