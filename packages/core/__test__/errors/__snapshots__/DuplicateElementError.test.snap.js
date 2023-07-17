/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["TestDuplicateElementError Test generate simple message"] = 
`Only one version of a Custom Element can be registered in the browser

[test error] has already been defined.

Potential causes:
1. No deduplication task has been performed
2. The same element definition has been loaded in multiple bundles
3. A single package has been upgraded, without upgrading other EF dependencies

Recommended fix:
1. Run 'npm dedupe' in you project folder
2. Rebuild your project

https://ui.refinitiv.com/kb/duplicate-element
`;
/* end snapshot TestDuplicateElementError Test generate simple message */

