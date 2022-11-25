
<!--
type: page
title: Duplicate Element
location: ./kb/duplicate-element
layout: default
-->

# Duplicate Element
## Potential Causes

**No deduplication task has been performed**

Run `npm dedupe` in your project's root folder.

**The same element definition has been loaded in multiple bundles**

Check your bundle tool's configuration, making sure that separate builds are not duplicating any modules.

**A single package has been upgraded, without upgrading other EF dependencies**

If an upgraded package requires a newer version of another package, version conflicts can occur due to locks in the `package-lock.json` file.
To prevent this from happening, you should perform `npm update`, instead of updating single package. Another fix is to delete your `package-lock.json` file and `node_modules` folder and reinstall all modules. Then, run `npm dedupe`, to deduplicate your modules.

::footer::
