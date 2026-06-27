---
title: AI - Practice App Manifest
sidebar_label: AI - Practice App Manifest
description: Guide for configuring app.json, including permissions, runtime settings, and common pitfalls.
---

# App Manifest (`app.json`) Guide for AI

The `app.json` file is the central configuration manifest for any Zepp OS application. Incorrect configuration is a common cause of application crashes or feature failures.

## 1. Key Configuration Areas
- **`runtime`**: Defines the API version (`apiVersion`). Ensure this matches the capabilities used in your app.
- **`permissions`**: List all required permissions (e.g., sensor access). If a permission is missing, the API call will fail silently or crash.
- **`module`**: Defines entry points for `page` and `app-side` (if applicable).

## 2. Common Pitfalls
- **Missing Permissions**: Always consult the API documentation for the required permission codes.
- **Incorrect Paths**: Ensure module paths in `app.json` match the actual folder structure.
- **Version Mismatch**: Using API features not supported by the configured `apiVersion`.

*Reference: Always check the [official app.json documentation](https://docs.zepp.com/docs/reference/app-json/).*
