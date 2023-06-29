export function onRequestGet({request}) {
  const url = new URL(request.url);
  const proxyUrl = `https://v6.refinitiv-ui.pages.dev${url.pathname}`;
  return fetch(proxyUrl);
}
