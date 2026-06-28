---
title: AI - Shared Utilities
sidebar_label: AI - Shared Utilities
description: Overview of ZML compatibility polyfills, event helpers, and shared managers.
---

# Shared Utilities

The `src/shared/` directory provides essential utilities, polyfills, and helpers to ensure compatibility and simplify development across different ZeppOS platforms and versions.

> [!NOTE]
> These are **internal** modules consumed by ZML itself. They are not exposed as public package exports. Application code should access logging and platform detection through the plugin APIs provided by `BasePage` and `BaseSideService` (e.g., `this.log()`, `this.error()`, `this.debug()`).

---

## Key Utilities

### 1. Buffer Management
Various versions of buffer handling to maintain compatibility across API levels:
*   `buffer.js` (main entry — auto-selects based on platform)
*   `buffer-1.0.js`, `buffer-2.0.js`, `buffer-3.0.js`

### 2. Promises & Timers
Polyfills for core asynchronous operations to maintain consistent behavior:
*   `promise.js` and versioned variants (`promise-1.0.js`, `promise-2.0.js`, `promise-3.0.js`).
*   `setTimeout.js` and versioned variants (`device-setTimeout-1.0.js`, `device-setTimeout-2.0.js`, `device-setTimeout-3.0.js`).

### 3. Events & Messaging
Infrastructure for inter-process communication and event handling:
*   `event.js`: General event emitter functionality.
*   `device-event-3.0.js`: Device-specific event adapter for ZeppOS 3.0+.
*   `message.js`: High-level messaging support (used internally by the messaging plugin).
*   `ble.js`: Bluetooth Low Energy helpers.

### 4. Logging & Utils
*   `logger.js`: A platform-aware logging utility. Automatically selects the appropriate logger implementation (`HmLogger` for ZeppOS 1.0, `@zos/utils` for ZeppOS 2.0+, or a `console`-based fallback). Exports `Logger` with a `getLogger(name)` factory.
*   `utils.js`: Miscellaneous utility functions.
*   `platform.js`: Platform detection helpers (`isZeppOS1()`, `isZeppOS2()`, `isSideService()`, etc.).

### 5. Data & Deferred Execution
*   `data.js`: Shared data store utilities.
*   `defer.js`: Deferred execution helper for scheduling tasks.

---

## Usage in Application Code

The recommended way to access logging in your pages and services is through the **logger plugin**, which is automatically registered by both `BasePage` and `BaseSideService`:

```javascript
import { BasePage } from '@zeppos/zml/base-page'

BasePage({
  onInit() {
    // this.log / this.error / this.debug are provided by the logger plugin
    this.log('Page initialized')
    this.error('Something went wrong')
    this.debug('Debug info:', this.state)
  },
})
```

If you need the raw `Logger` factory for a standalone internal utility module, you can import it directly from the source (in a build environment that resolves internal ZML paths):

```javascript
import { Logger } from '../shared/logger.js'

const logger = Logger.getLogger('MyModule')
logger.log('Message from ZML')
```
