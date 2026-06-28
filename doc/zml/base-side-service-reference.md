---
title: AI - BaseSideService Reference
sidebar_label: AI - BaseSideService
description: Detailed guide for App-side Side Services, covering lifecycle, messaging, settings, and file transfer.
---

# BaseSideService Reference

`BaseSideService` is the foundational class for developing ZeppOS App-side services (Side Services). It facilitates complex tasks like messaging, file transfers, and settings management through a robust plugin-based architecture.

## Quick API Summary

**Lifecycle Hooks:** `onInit()`, `onRun()`, `onDestroy()`

**Messaging Hooks:** `onCall()`, `onRequest(req, res)`

**Settings Hooks:** `onSettingsChange({ key, newValue, oldValue })`

**File Transfer Hooks:** `onReceivedFile(fileData)`

**Messaging Methods:** `call(data)`, `request(data, opts)`

**File Transfer Methods:** `sendFile(path, opts)`

**Download Method:** `download(url, opts)`

**Convert Method:** `convert(opts)`

**Logger Methods:** `this.log()`, `this.error()`, `this.debug()`

**Context:** `this.state`, `this.messaging`, `this.settings`, `this.logger`

## Initialization & Plugins

`BaseSideService` is initialized with configuration options and supports plugins via the `use()` method.

```javascript
import { BaseSideService } from '@zeppos/zml/base-side'
// Example: Importing plugins
import { messagingPlugin } from './messaging/messaging-plugin.js'

// Register plugins
BaseSideService.use(messagingPlugin)
```

## Lifecycle Methods

The lifecycle management for `BaseSideService` ensures proper initialization, execution, and teardown of plugins and custom service logic.

| Method        | Description                                                                                   |
| :------------ | :-------------------------------------------------------------------------------------------- |
| `onInit()`    | Invoked when the service is instantiated. Plugins run their `onInit` **before** custom logic. |
| `onRun()`     | Invoked when the service starts execution. Plugins run their `onRun` **before** custom logic. |
| `onDestroy()` | Invoked when the service is terminated. Plugins run their `onDestroy` **after** custom logic. |

### Plugin Integration

Like `BasePage`, ZML ensures proper sequencing of plugin and custom lifecycle logic, with plugins running first for initialization hooks and last for cleanup.

## Plugin Capabilities

`BaseSideService` comes bundled with several powerful plugins (configured in `zml-side-service.js`):

### 1. Messaging Plugin

Enables bidirectional communication between Device-side (pages) and App-side (services).

**Hooks:**

- `onCall(data)` - Receives calls from device-side without expecting a response.
- `onRequest(req, res)` - Receives requests from device-side. Call `res(error, data)` to send response.

**Methods:**

- `call(data)` - Send a call to device-side (fire-and-forget).
- `request(data, opts)` - Send a request to device-side and wait for response. Returns a Promise.

**Example:**

```javascript
onInit() {
  // Handle incoming requests from device
  this._onRequest = this.onRequest?.bind(this);
  this.messaging.onRequest(this._onRequest);
},

onRequest(req, res) {
  this.log('Request from device:', req);
  // Process and respond
  res(null, { success: true, data: 'result' });
},

onCall(data) {
  this.log('Call from device:', data);
}
```

### 2. Settings Plugin

Allows reading and subscribing to user-defined app settings. When a user changes settings on the mobile application's Settings Page (`AppSettingsPage`), the changes are automatically synchronized to the side service.

#### Settings Hook: `onSettingsChange(event)`

The `onSettingsChange` hook is called whenever a setting is updated on the companion app settings page. It receives a change event object with the following structure:

| Property | Type | Description |
| :--- | :--- | :--- |
| `key` | `string` | The key of the setting that was changed. |
| `newValue` | `any` | The new value of the setting (automatically parsed if it was serialized). |
| `oldValue` | `any` | The previous value of the setting before the change. |

> [!NOTE]
> If the Side Service is not running when a setting is changed, ZeppOS will automatically launch the Side Service. ZML handles this event during startup and will invoke the `onSettingsChange` hook with the launch arguments (which contain the changed setting).

#### Settings API: `this.settings`

The `this.settings` property exposes an instance of `settingsLib` (which wraps the underlying ZeppOS settings storage). It provides the following methods:

| Method | Description |
| :--- | :--- |
| `getAll()` | Returns all settings as a plain key-value object. |
| `getItem(key)` | Returns the value of a specific setting key. |
| `setItem(key, value)` | Sets the value of a specific setting key. |
| `removeItem(key)` | Removes a specific setting key. |
| `clear()` | Clears all settings. |

**Example:**

```javascript
onInit() {
  // Retrieve all current settings on initialization
  const currentSettings = this.settings.getAll();
  this.log('Current settings:', currentSettings);
},

onSettingsChange({ key, newValue, oldValue }) {
  this.log(`Setting "${key}" changed from`, oldValue, 'to', newValue);
  
  if (key === 'username') {
    this.state.username = newValue;
  }
}
```

For more information on building the settings UI and how data is written to the storage, see the [AppSettingsPage Reference](app-settings-page.md).


### 3. File Transfer Plugin

Simplifies transferring files between the phone and the watch.

**Hooks:**

- `onReceivedFile(fileData)` - Called when a file is received from device-side.

**Methods:**

- `sendFile(path, opts)` - Send a file to device-side.

**Example:**

```javascript
onInit() {
  // Set up file reception
},

onReceivedFile(fileData) {
  this.log('File received:', fileData);
},

sendFileToDevice() {
  this.sendFile('/path/to/file.txt', {
    // transfer options
  });
}
```

### 4. Download Plugin

Manages file downloads from the internet.

**Methods:**

- `download(url, opts)` - Download a file from URL. Returns a task object.

**Example:**

```javascript
onRun() {
  this.download('https://example.com/data.json', {
    path: '/download/data.json'
  })
    .then(() => this.log('Download complete'))
    .catch(err => this.error('Download failed:', err));
}
```

### 5. Convert Plugin

Provides image conversion capabilities.

**Methods:**

- `convert(opts)` - Convert image format. Options include source, target format, etc.

**Example:**

```javascript
onRun() {
  this.convert({
    input: '/path/to/image.jpg',
    output: '/path/to/image.png',
    format: 'png'
  });
}
```

### 6. Logger Plugin

Provides logging utilities for debugging and monitoring.

**Methods:**

- `this.log(...args)` - Log info-level messages.
- `this.error(...args)` - Log error-level messages.
- `this.debug(...args)` - Log debug-level messages.

**Example:**

```javascript
onInit() {
  this.log('Service initialized');
  this.debug('Debug info:', this.state);
}
```

## Context (`this`)

Within BaseSideService hooks and methods, `this` provides access to:

- `this.state` - The reactive state object defined in the service
- `this.messaging` - Messaging API instance for communication with device-side pages
- `this.settings` - Settings API instance for accessing app settings
- `this.log()` / `this.error()` / `this.debug()` - Logger methods from logger plugin
- Plugin-provided methods: `request()`, `call()`, `sendFile()`, `download()`, `convert()`, etc.

## Example Usage: Complete Service

```javascript
import { BaseSideService, settingsLib } from '@zeppos/zml/base-side'

BaseSideService({
  state: {
    isRunning: false,
    lastUpdate: null,
    settings: {},
  },

  onInit() {
    this.log('Service initialized')

    // Load initial settings
    this.state.settings = this.settings.getAll()
    this.log('Loaded settings:', this.state.settings)

    // Set up messaging handlers
    this._onRequest = this.onRequest?.bind(this)
    this._onCall = this.onCall?.bind(this)
    this.messaging.onRequest(this._onRequest).onCall(this._onCall)
  },

  onRun() {
    this.log('Service running')
    this.state.isRunning = true

    // Start background tasks
    this.backgroundTask()
  },

  onDestroy() {
    this.log('Service destroyed')
    this.state.isRunning = false

    // Clean up
    if (this._onRequest) {
      this.messaging.offOnRequest(this._onRequest)
    }
    if (this._onCall) {
      this.messaging.offOnCall(this._onCall)
    }
  },

  // Messaging handlers
  onRequest(req, res) {
    this.log('Device requested:', req.method, req.params)

    switch (req.method) {
      case 'getData':
        res(null, {
          data: 'Service data',
          timestamp: Date.now(),
        })
        break

      case 'downloadFile':
        this.downloadAndSend(req.params, res)
        break

      default:
        res({ code: 'UNKNOWN_METHOD', message: 'Unknown method' })
    }
  },

  onCall(data) {
    this.log('Device called (no response needed):', data)
  },

  // Settings change handler
  onSettingsChange(newSettings) {
    this.log('Settings changed:', newSettings)
    this.state.settings = newSettings

    // Notify device about settings change
    this.call({
      method: 'settingsUpdated',
      data: newSettings,
    })
  },

  // File transfer handler
  onReceivedFile(fileData) {
    this.log('File received:', fileData)
    // Process received file
  },

  // Custom methods
  downloadAndSend(params, res) {
    this.download(params.url, {
      path: params.path,
    })
      .then(() => {
        this.log('Download complete, sending file to device')
        return this.sendFile(params.path)
      })
      .then(() => {
        res(null, { success: true })
      })
      .catch((err) => {
        this.error('Download/send failed:', err)
        res(err)
      })
  },

  backgroundTask() {
    if (!this.state.isRunning) return

    // Periodic task
    this.log('Background task running')
    this.state.lastUpdate = Date.now()

    // Simulate work
    setTimeout(() => this.backgroundTask(), 60000)
  },
})
```
