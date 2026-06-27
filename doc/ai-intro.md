---
title: AI - practice
sidebar_label: AI - practice
description: This section contains guides and best practices to help AI models write efficient and correct applications for Zepp OS.
---

# AI - Practice Introduction

This section contains guides and best practices to help AI models write efficient and correct applications for Zepp OS.

## Best Practices & Optimization

### JavaScript Performance in Zepp OS

To ensure applications are performant and memory-efficient:

- **Limit Global Scope**: Avoid declaring variables at the top level (global scope) unnecessarily. Global variables persist for the lifetime of the Mini Program and consume RAM.
- **Use Local Scope**: Prefer `let` inside functions or lifecycle methods (`onInit`, `build`, etc.). These variables are garbage-collected when the function finishes.
- **Avoid Heavy Initialization**: Don't perform expensive operations or define large objects/arrays globally.

### Managing Global State

If you need to share data across different pages:

- **Do NOT** use global variables.
- **DO** use the `globalData` object provided by the `App` instance.
- **Accessing Global Data**: Use `getApp()._options.globalData` to access or modify data shared across the entire application lifecycle.

Official Reference: [getApp() Documentation](../../reference/device-app-api/newAPI/global/getApp.mdx)

---

## Technical Instructions

- [UI Instructions](ui-instructions.md) - Guidelines on creating widgets, screen adaptation, and using the `@zos/ui` library.
- [App Lifecycle & Routing](app-lifecycle-instructions.md) - Instructions on application lifecycle (`App`, `Page`) and page navigation using the router module.
- [Sensors](sensors-instructions.md) - Best practices for handling sensor data, managing permissions, and resource cleanup.
- [File System (FS)](fs-instructions.md) - Guidelines on synchronous file operations, file descriptor management, and error handling.
