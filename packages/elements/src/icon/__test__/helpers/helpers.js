export const tickCDN = 'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/tick.svg';
export const tickSvgCDN = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path stroke="#000" d="m14 4-8.25 8.25L2 8.5" fill="none" fill-rule="evenodd"/></svg>';
export const tickSvgSprite = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="tick"><path stroke="currentColor" d="m14 4-8.25 8.25L2 8.5" fill="none" fill-rule="evenodd"></path></svg>';
export const tickSvgBase64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgaWQ9InRpY2siPjxwYXRoIHN0cm9rZT0iY3VycmVudENvbG9yIiBkPSJtMTQgNC04LjI1IDguMjVMMiA4LjUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjwvc3ZnPg==';
export const spriteSvg = `<?xml
version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <svg viewBox="0 0 16 16" id="tick" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" d="m14 4-8.25 8.25L2 8.5" fill="none" fill-rule="evenodd"/>
        </svg>
        <svg viewBox="0 0 16 16" id="toasts-panel" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" fill-rule="evenodd">
                <path d="M4 11h1M4 8h1M2.5 3.5v9h11v-9h-11ZM4 5h1M2.5 9.5h11M2.5 6.5h11"/>
            </g>
        </svg>
    </defs>
</svg>
`;
export const iconName = 'tick';
let iconId = 0;

export const checkRequestedUrl = (requests, url) =>{
  for (let i = 0; i < requests.length; i++) {
    if(requests[i][0] === url){
      return true;
    }
  }
  return false;
}

export const generateUniqueName = name => `${name}_${iconId+=1}`;

export const createMockSrc = icon => `https://mock.cdn.com/icons/${icon}.svg`;

export const createFakeResponse = (body, config = responseConfigSuccess) => {
  const { ok, status, headers} = config;
  const response = new window.Response(body, {
    ok,
    status,
    headers,
    clone: () => ({
      text: async () => {
        return await Promise.resolve(body);
      }
    })
  });
  window.fetch.returns(Promise.resolve(response));
}

export const responseConfigSuccess = {
  ok: true,
  status: 200,
  headers: {
    'Content-type': 'image/svg+xml'
  }
};

export const responseConfigError = {
  ok: false,
  status: 404,
  headers: {}
};

export const isEqualSvg = (svg, otherSvg) => {
  const parser = new DOMParser();
  const svgNode = parser.parseFromString(svg, 'image/svg+xml');
  const otherSvgNode = parser.parseFromString(otherSvg, 'image/svg+xml');
  return svgNode.isEqualNode(otherSvgNode);
};
