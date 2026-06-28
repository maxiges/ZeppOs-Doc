---
title: AI - BasePage Reference
sidebar_label: AI - BasePage
description: Detailed reference for the BasePage component, covering lifecycle hooks, messaging APIs, and logger utilities.
---

# BasePage Reference

`BasePage` is the core wrapper for ZeppOS pages in ZML, enabling plugin-based architecture and providing structured lifecycle management.

## Quick API Summary

**Lifecycle Hooks:** `onInit()`, `onResume()`, `onPause()`, `build()`, `onDestroy()`

**Messaging Hooks:** `onCall()`, `onRequest()`, `onBleChanged()`, `onReceivedFile()`

**Messaging Methods:** `call()`, `request()`, `httpRequest()`, `sendFile()`

**Logger Methods:** `this.log()`, `this.error()`, `this.debug()`

**Context:** `this.state`, `this.$m`, `this.messaging`, `this.logger`

## Initialization & Plugins

`BasePage` uses a plugin-based system to extend standard ZeppOS page functionality.

```javascript
import { BasePage } from '@zeppos/zml/base-page'
// Example: Importing plugins
import { loggerPlugin } from './logger/logger-plugin.js'

// Register plugins globally for BasePage
BasePage.use(loggerPlugin)
```

## Lifecycle Methods

`BasePage` intercepts standard ZeppOS page lifecycles to allow plugins to register handlers, while still allowing the page definition to override them.

When defining a page, you can pass these hooks:

| Method        | Description                                                                                  |
| :------------ | :------------------------------------------------------------------------------------------- |
| `onInit()`    | Called upon page initialization. Plugin handlers execute **before** custom logic.            |
| `onResume()`  | Called when the page enters the foreground. Plugin handlers execute **before** custom logic. |
| `onPause()`   | Called when the page leaves the foreground. Plugin handlers execute **after** custom logic.  |
| `build()`     | Called to render the page structure. Plugin handlers execute **before** custom logic.        |
| `onDestroy()` | Called when the page is destroyed (cleanup). Plugin handlers execute **after** custom logic. |

### Plugin Integration

ZML ensures that for every lifecycle event, registered plugins have their corresponding handlers executed _before_ (for `onInit`, `onResume`, `build`) or _after_ (for `onPause`, `onDestroy`) the custom logic provided in the page definition.

## Messaging API (Communication with App-Side)

When the messaging plugin is enabled, BasePage provides methods for bidirectional communication:

### Hooks

| Hook                   | Description                                                                   |
| :--------------------- | :---------------------------------------------------------------------------- |
| `onCall(data)`         | Receives calls from app-side service without expecting a response.            |
| `onRequest(data)`      | Receives requests from app-side service and should return a response/promise. |
| `onBleChanged(data)`   | Receives BLE connection status changes.                                       |
| `onReceivedFile(data)` | Receives file transfer notifications from app-side.                           |

### Methods

| Method                 | Description                                                                 |
| :--------------------- | :-------------------------------------------------------------------------- |
| `call(data)`           | Send a call to app-side (fire-and-forget). Returns the result of execution. |
| `request(data, opts)`  | Send a request to app-side and wait for response. Returns a Promise.        |
| `httpRequest(options)` | Perform HTTP request (must be called via messaging). See example below.     |
| `sendFile(path, opts)` | Send a file to app-side via file transfer protocol.                         |

## Logger API

BasePage automatically provides logging utilities:

| Method            | Description               |
| :---------------- | :------------------------ |
| `this.log(...)`   | Log info-level messages.  |
| `this.error(...)` | Log error-level messages. |
| `this.debug(...)` | Log debug-level messages. |

### Logger Example

```javascript
onInit() {
  this.log('Page initialized')
  this.debug('Debug information:', this.state)
  this.error(new Error('Something went wrong'))
}
```

## Messaging API Details

#### `request()` Example

```javascript
onInit() {
  this.request({
    method: 'test.read',
    params: {
      start: 1,
    },
  })
    .then((result) => {
      console.log('Response:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
```

#### `httpRequest()` Example

```javascript
readAsync() {
  return this.httpRequest({
    method: 'get',
    url: 'https://api.example.com/data',
  })
    .then((result) => {
      console.log('HTTP response:', result.body);
    })
    .catch((error) => {
      console.error('HTTP error:', error.message);
    });
}
```

#### File Transfer Example

```javascript
onInit() {
  // Set up file reception handler
}

onReceivedFile(fileData) {
  console.log('Received file:', fileData);
}

sendFileToApp() {
  this.sendFile('/path/to/file', {
    // transfer options
  });
}
```

## Context (`this`)

Within BasePage hooks and methods, `this` provides access to:

- `this.state` - The reactive state object defined in the page
- `this.$m` - App-side service instances (from app-service plugin, e.g., `this.$m.BgService`)
- `this.messaging` - Messaging API instance for communication with app-side
- `this.log()` / `this.error()` / etc. - Logger methods from logger plugin
- Plugin-provided methods: `request()`, `call()`, `httpRequest()`, `sendFile()`, etc.

## Example Usage

```javascript
import { BasePage } from '@zeppos/zml/base-page'
import { layout } from 'zosLoader:./index.[pf].layout.js'

Page(
  BasePage({
    state: {
      count: 0,
      data: null,
    },

    onInit() {
      this.log('Page init. State:', this.state)

      // Request data from app-side
      this.request({
        method: 'getData',
      })
        .then((result) => {
          this.state.data = result
          this.log('Data received:', result)
        })
        .catch((error) => {
          this.error('Failed to get data:', error)
        })
    },

    build() {
      this.log('Building page layout')
      layout.render(this)
    },

    onResume() {
      this.log('Page resumed')
    },

    onPause() {
      this.log('Page paused')
    },

    // Custom method using messaging
    refreshData() {
      return this.request({
        method: 'refreshData',
        params: { timestamp: Date.now() },
      })
    },

    // Handle incoming requests from app-side
    onRequest(data) {
      this.log('Request from app:', data)
      // Return response (can be Promise)
      return { success: true, received: data }
    },

    // Handle incoming calls from app-side (no response needed)
    onCall(data) {
      this.log('Call from app:', data)
    },

    onDestroy() {
      this.log('Page destroyed')
    },
  }),
)
```
