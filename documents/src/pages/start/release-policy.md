<!--
type: page
title: Release Policy
location: ./start/release-policy
layout: default
-->

# Release Policy

<!-- todo: too long -->
We recognize that you need stability from the Element framework. Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly.

We strive to continuously improve and enable you to stay up-to-date with the rest of the web ecosystem and your user needs.

We want everyone who depends on Element Framework to know when and how new features are added, and to be well-prepared when deprecated ones are removed.

## Versioning

Element framework version numbers follows [semantic versioning](https://semver.org/) to help you understand the potential impact of updating to a new version.

The version numbers have three parts: major.minor.patch. For example, version 6.8.5 indicates major version 6, minor version 8, and patch level 5.

The version number is incremented based on the level of change included in the release.

LEVEL OF CHANGE|DETAILS
--|--
Major release|Contains significant new features or breaking changes. When updating to a new major release, we will publish a guide to help on how to upgrade. You might need to run update scripts, refactor code, run additional tests, and learn new APIs.
Minor release|Contains new features yet it's fully backward-compatible. You apps would continue to work as before.
Patch release|Low risk, bug fix release.

<!-- ## Supported update paths -->

<!-- ?: it's already available but on SharePoint. just don't mention it here? What are the options? -->

<!-- ## Preview releases -->

<!-- ?: I don't think we want to advertize about this, right? -->

<!-- ## Release frequency -->

<!-- ?: ours is not thar clear so skip this section too? -->

## Support Policy

* last 2 major release are fully-supported
* only the latest major release get new features
* critical issue only for 2 major version away from the latest release

Version|Status|Released
--|--|--
7|Active|2023-06
6|Supported|2022-06
4|critical issue only|2021?

EF v1 to v3 are no longer supported

## Deprecation Practices

Sometimes "breaking changes", such as the removal of APIs and features, are necessary to innovate and stay current with new best practices, changing dependencies, or changes in the (web) platform itself.

We work hard to minimize the number of breaking changes, to provide migration/replacement when possible.

To allow sufficient time for you to update your applications to the latest APIs and best practices, these are our deprecation practices:

* Deprecation might be introduced in any releases yet the deprecated API/feature would remain present at least until the next major release.
* Deprecated API usage would generate a warning in console to give you heads up.
* We only remove deprecated API/feature in major release.

<!-- ## Public API surface -->

<!-- ?: no need? -->

<!-- ## Developer Preview -->

<!-- ?: no plan for this yet? -->

::footer::
