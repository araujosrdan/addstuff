//Variáveis
const cacher = "site-static-v1";
const assets = [
  '.',
  'index.html',
  'assets/img/logo.png',
  'assets/img/512x512.png',
  'assets/img/256x256.png',
  'assets/img/144x144.png',
  'assets/img/96x96.png',
  'assets/fontawesome-free-5.7.1-web/css/all.css',
  'assets/bootstrap/bootstrap.min.css',
  'assets/iziToast/dist/css/iziToast.min.css',
  'assets/css/app.css',
  'assets/iziToast/dist/js/iziToast.min.js',
  'assets/fontawesome-free-5.7.1-web/js/all.js',
  'assets/js/app.js'
];

// Instalação do service worker
self.addEventListener("install", evt => {
	// console.log("Serviço instalado corretamente!");
  evt.waitUntil(
    caches.open(cacher)
    .then(cache => {
      // console.log("Cacheando arquivos base");
      cache.addAll(assets);
    })
  );
});

// Ativando o serviço
self.addEventListener("activate", evt => {
	// console.log("Serviço ativado corretamente!");
  evt.waitUntil(
    caches.keys()
    .then(keys => {
      // console.log(keys);
      return Promise.all(keys
        .filter(key => key !== cacher)
        .map(key => caches.delete(key))
      )
    })
  );
});

// Função para atualizar no refresh
self.addEventListener("message", evt => {
  if (!event.data) {
    return;
  }

  if (event.data === "skipWaiting") {
    self.skipWaiting();
  }
});

self.addEventListener("controllerchange", evt => {
	if (refreshing) {
		return;
	}
	refreshing = true;
  	window.location.reload();
});

//Busca por conteúdos
self.addEventListener("fetch", evt => {
  // console.log("Conteúdo buscado, ", evt);
  evt.respondWith(
    caches.match(evt.request)
    .then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});