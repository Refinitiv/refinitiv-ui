import { fixture, nextFrame } from "@refinitiv-ui/test-helpers";

export const tickSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path stroke="#000" d="M14 4l-8.25 8.25L2 8.5" fill="none" fill-rule="evenodd"></path></svg>';
export const iconName = 'tick';
let iconId = 0;

export const createAndWaitForLoad = async template => {
    const el = await fixture(template);
    await nextFrame();
    return el;
};

export const checkRequestedUrl = (requests, url) =>{
    for (let i = 0; i < requests.length; i++) {
      if(requests[i].url === url){
        return true;
      }
    }
    return false;
}

export const generateUniqueName = name => `${name}_${iconId+=1}`;

export const createMockSrc = icon => `https://mock.cdn.com/icons/${icon}.svg`;
