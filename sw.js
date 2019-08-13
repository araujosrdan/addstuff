// Instalação do service worker

// Versão:
var ver = 8;

self.addEventListener("install", evt => {
	console.log("Serviço instalado corretamente! Versão: " + ver);
});

// Ativando o serviço
self.addEventListener("activate", evt => {
	console.log("Serviço ativado corretamente!");
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

});