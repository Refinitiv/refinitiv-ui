const { join } = require('path');
const { readFileSync } = require('fs');
const { parseDOM } = require('htmlparser2');
const serialize = require('dom-serializer');
const { selectOne } = require('css-select');

const parseOptions = require('./parse-options');
const encodeAndWrapWithEnvelope = require('./encoders');

const defaultOptions = {
    base64: false,
    encode: false,
};

class LessPluginInlineSvg {
    constructor(options = {}) {
        this.options = Object.assign({}, defaultOptions, options);
    }

    setOptions(options) {
        this.options = Object.assign({}, defaultOptions, parseOptions(options));
    }

    install(less) {
        const {Quoted} = less.tree;
        const {
            base64: encodeWithBase64,
            encode: encodeEntities
        } = this.options;

        less.functions.functionRegistry.addMultiple({
            'inline-svg'(fileArg) {
                const {_fileInfo, value} = fileArg;
                const {currentDirectory} = _fileInfo;

                const filePath = join(currentDirectory, value);
                let svgCode = readFileSync(filePath);

                const args = [...arguments].slice(1);

                if (args.length > 1) {
                    const dom = parseDOM(svgCode, {xmlMode: true});

                    while (args.length) {
                        const {value: cssSelector} = args.shift();
                        const svgAttrs = args.shift();

                        if (!cssSelector || !svgAttrs) {
                            break;
                        }

                        const svgEl = selectOne(cssSelector, dom);

                        let attributes = {};
                        try {
                            // attributes passed as simple ruleset
                            svgAttrs.ruleset.rules.forEach(rule => {
                                rule.name.forEach(name => {
                                    attributes[name.value] = rule.value.value;
                                });

                            });
                        } catch(e) {
                            // attributes passed as string
                            svgAttrs.value.split(/[;]/)
                                .forEach(attribute => {
                                    const [key, val] = attribute.trim().split(/:\s?/);
                                    attributes[key.trim()] = val.trim();
                                });
                        }

                        Object.keys(attributes).forEach( key => {
                            svgEl.attribs[key] = attributes[key];
                        });
                    }

                    svgCode = serialize(dom);
                }

                const encoder = (encodeWithBase64 && 'base64')
                    || (encodeEntities && 'encode')
                    || null;
                const convertedCode = encodeAndWrapWithEnvelope(svgCode, encoder);

                return new Quoted('"', convertedCode);
            }
        });
    }
}

module.exports = LessPluginInlineSvg;
