# Element preparation scripts

Following scripts are designed to run at `prePublishOnly` hook, which is just before elements are published to NPM registry.

- **API analyzer**: Generates API information in readable JSON format that can be easily use in documentation.
- **JSX generator**: Generates JSX-specific type declaration for webcomponents.
- **Theme extractor**: Extracts latest theme and ship it along with each element.
- **Versioning**: Writes package version into the source code.
