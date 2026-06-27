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

Official Reference: [getApp() Documentation](https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/getApp)

---

## Technical Instructions

- [UI Instructions](ui-instructions.md) - Guidelines on creating widgets, screen adaptation, and using the `@zos/ui` library.
- [App Lifecycle & Routing](app-lifecycle-instructions.md) - Instructions on application lifecycle (`App`, `Page`) and page navigation using the router module.
- [Communication](communication.md) - Guide on watch-phone communication using ZML.
- [Sensors](sensors-instructions.md) - Best practices for handling sensor data, managing permissions, and resource cleanup.
- [File System (FS)](fs-instructions.md) - Guidelines on synchronous file operations, file descriptor management, and error handling.

## 1. Runtime Environment

To find these versions, open your `app.json` file and look for the `runtime` -> `apiVersion` section:

```json
"runtime": {
  "apiVersion": {
    "compatible": "3.0",
    "target": "3.0",    // Target API version
    "minVersion": "3.0" // Minimum supported version
  }
}
```

- **Zepp OS API Target Version**: [Copy from `target`]
- **Minimum Supported API Version**: [Copy from `minVersion`]
- **Compatible API Version**: [Copy from `compatible`]

## 2. Project Configuration

- [App.json Official Reference](https://docs.zepp.com/docs/reference/app-json/) - The official documentation for configuring Zepp OS application manifest properties.
- **App Name**: [Insert App Name]
- **App ID**: [Insert App ID]
- **App Type**: [app / watchface]

## 3. Capabilities & Permissions

- **Permissions**:
  - [Example: data:os.device.info]
  - [Example: device:os.local_storage]

## 4. UI/Platform Support

- **Supported Platforms**: [e.g., Round, Square]
- **Layout System**: [e.g., Static / Dynamic Layouts 4.0+]

---

_Note: This information is derived from the `app.json` file in the project root. For more details on `app.json` configuration, refer to the [official documentation](https://docs.zepp.com/docs/reference/app-json/)._
