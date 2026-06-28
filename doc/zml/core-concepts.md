---
title: AI - Core Concepts
sidebar_label: AI - Core Concepts
description: Explanation of ZML plugin-based architecture and project directory structure.
---

# Core Concepts

## Plugin Architecture

ZML enables functionality extension through plugins. The `BaseApp` and `BasePage` classes both support the `.use()` method to register plugins.

### Example Plugin Registration

```javascript
import { BaseApp } from '@zeppos/zml/base-app';
import { appPlugin as messagingPlugin } from './messaging/app-plugin.js';

// Register plugins before passing the app config
BaseApp.use(messagingPlugin);

App(BaseApp({ /* ... */ }));
```

---

## Core Modules (`src/core/`)

The core library is divided into logical areas:

### 1. Common (`src/core/common/`)
Contains shared infrastructure logic:
*   `callback-set.js`: Manage sets of callbacks.
*   `disposable.js` / `idisposable.js`: Implement disposable pattern for clean resource management.
*   `plugin-service.js`: The foundation for the plugin system.

### 2. Device (`src/core/device/`)
Provides extended functionality for the device side of ZeppOS:
*   `zml-app.js` / `zml-page.js`: The main entry points with built-in plugin support.
*   `app-service/`: Plugins for apps and pages (Global, Messaging, FileTransfer).

### 3. Side (`src/core/side/`)
Provides services for the app-side (ZeppOS side service):
*   `zml-side-service.js`: Base class for side services.
*   Includes specialized services for file system, file transfer, and settings.
