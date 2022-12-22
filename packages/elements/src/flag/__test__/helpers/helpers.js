import { fixture, nextFrame, aTimeout } from "@refinitiv-ui/test-helpers";

export const gbSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" focusable="false"><path fill="#012169" d="M0 0h640v480H0z"></path><path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"></path><path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"></path><path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"></path><path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"></path></svg>';
export const flagName = 'gb';
let flagId = 0;

export const createAndWaitForLoad = async template => {
    const el = await fixture(template);
    await aTimeout(200);
    await nextFrame();
    return el;
};

export const checkRequestedUrl = (requests, url) =>{
  for (let i = 0; i < requests.length; i++) {
    if(requests[i][0] === url){
      return true;
    }
  }
  return false;
}

export const generateUniqueName = name => `${name}_${flagId+=1}`;

export const createMockSrc = flag => `https://mock.cdn.com/flags/${flag}.svg`;

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
