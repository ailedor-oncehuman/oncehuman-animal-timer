const CACHE='oncehuman-timer-ver7-v1';
const ASSETS=[
 './','index.html','manifest.webmanifest','icon.png',
 'wolf.png','leopard.png','bear.png','boar.png','buffalo.png','polarbear.png',
 'rabbit.png','deer.png','sheep.png','capybara.png','fox.png','snowfox.png',
 'flamingo.png','crocodile.png','seaturtle.png','alligator_turtle.png'
];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
 e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('./'))));
});
