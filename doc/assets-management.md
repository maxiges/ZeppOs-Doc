---
title: AI - Practice Assets Management
sidebar_label: AI - Practice Assets Management
description: Best practices for managing assets, resources, and screen adaptation in Zepp OS projects.
---

# Assets Management Guide for AI

Effective asset management ensures smooth UI performance and correct cross-device support.

## 1. Directory Structure
- Place all static resources in the `assets/` directory.
- Maintain consistent naming conventions.

## 2. Screen Adaptation
- Zepp OS uses specific resource directories to support different screen shapes and sizes (e.g., `assets/round`, `assets/square`).
- Always follow the [official screen adaptation specification](https://docs.zepp.com/docs/guides/framework/device/screen-adaption/).

## 3. Best Practices
- **Optimize**: Compress images (e.g., PNG) to minimize app size.
- **Lazy Loading**: If applicable, load heavy assets dynamically to improve startup time.
- **Consistency**: Ensure all resource files have counterparts in all required device-specific folders if necessary.
