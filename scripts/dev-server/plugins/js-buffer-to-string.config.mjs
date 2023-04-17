import { Buffer } from 'node:buffer';

// Workaround for issue UTF-8 wide characters are unsupported
// from https://github.com/modernweb-dev/web/issues/1888
export const pluginJsBufferToString = {
  name: "plugin-js-buffer-to-string",
  transform(context) {
    if (context.response.is("js") && Buffer.isBuffer(context.body)) {
        context.body = context.body.toString();
    }
  }
};