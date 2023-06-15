export const tickSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path stroke="#000" d="M14 4l-8.25 8.25L2 8.5" fill="none" fill-rule="evenodd"></path></svg>';
export const tickSvgBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik0xNCA0bC04LjI1IDguMjVMMiA4LjUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==';
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
