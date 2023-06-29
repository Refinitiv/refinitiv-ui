<!--
type: page
title: Release Policy
location: ./start/release-policy
layout: default
-->

# Release Policy

We strive to improve Element Framework enabling you to stay up-to-date with the rest of the web ecosystem, new best practices and your user needs. To fulfill this mission, sometimes "breaking changes", such as the removal of APIs and features, are necessary.

We want everyone who depends on Element Framework to know when and how new features are added, feature/API deprecations take place, and to be well-prepared when the deprecated ones are removed.

## Versioning

Element framework version numbers follows [semantic versioning](https://semver.org/) to help you understand the potential impact of updating to a new version. The version numbers have three parts: major.minor.patch. For example, version `6.8.5` indicates major version `6`, minor version `8`, and patch level `5`.

The version number is incremented based on the level of change included in the release.

LEVEL OF CHANGE|DETAILS
--|--
Major|Contains significant new features or breaking changes. Along with this type of release, We will publish a guide on how to upgrade. You might need to refactor code, re-run tests, and learn new APIs.
Minor|Introduces new features while maintaining backward-compatibility.
Patch|Provides backward-compatible bug fixes or internal improvements.

<!-- ## Supported update paths -->

<!-- ?: it's already available but on SharePoint. just don't mention it here? What are the options? -->

<!-- ## Preview releases -->

<!-- ?: I don't think we want to advertize about this, right? -->

<!-- ## Release frequency -->

<!-- ?: ours is not thar clear so skip this section too? -->

## Supported Versions

Version|Status|Released
--|--|--
7|Supported|2023-06
6|Supported|2022-06
4|Critical Issue Only|2020-06

!> Element Framework v1 to v3 are no longer supported

## Deprecation Practices

We work hard to minimize the number of breaking changes and to provide migration/replacement when possible. To allow sufficient time for applications to adopt the latest APIs and best practices, these are our deprecation practices:

* Deprecation might be introduced in any releases.
* Deprecated APIs or features would remain present at least until the next major release.
* Usage of deprecated API or features would generate a warning in console.
* We remove deprecated APIs or features in major release only.

<!-- ## Public API surface -->

<!-- ?: no need? -->

<!-- ## Developer Preview -->

<!-- ?: no plan for this yet? -->

::footer::
