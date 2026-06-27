---
title: AI - Practice i18n
sidebar_label: AI - Practice i18n
description: Guide on implementing internationalization (i18n) for Zepp OS applications using @zos/i18n.
---

# Internationalization (i18n) Guide for AI

This guide helps AI models implement multi-language support in Zepp OS applications.

## 1. Core Concepts
Zepp OS provides the `@zos/i18n` library to support internationalization. The core idea is to separate text strings from the UI logic.

## 2. Implementation Steps
1.  **Create Language Files**: In your project, create an `i18n` directory (e.g., `i18n/` or `assets/i18n/`).
2.  **Define JSON files**: Create separate JSON files for each language, e.g., `en-US.json`, `pl-PL.json`.
3.  **Load and Use**: Use the `i18n` API to get the translated string based on the user's system language setting.

## 3. Best Practices
- Always provide a default language (usually `en-US`).
- Keep JSON structure consistent across language files.
- Use the provided API methods to fetch localized strings, do not hardcode text.

*Reference: Check the official Zepp OS documentation for the latest `@zos/i18n` API.*
