export function onRequestGet({ request }) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/^\/v6\/?/, '/');
  const proxyUrl = `https://v6.refinitiv-ui.pages.dev${pathname}`;
  return fetch(proxyUrl);
}
