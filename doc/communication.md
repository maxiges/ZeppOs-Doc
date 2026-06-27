---
title: AI - Practice Communication
sidebar_label: AI - Practice Communication
description: Guide on structuring Zepp OS 3.0 projects and implementing bidirectional communication between watch and phone using the Zepp Mobile Library (ZML).
---

# Zepp OS 3.0: Project Creation and Watch-Phone Communication Guide

This guide provides a step-by-step overview of how to structure a **Zepp OS 3.0** project and implement bidirectional communication between the watch and phone using the official **Zepp Mobile Library (`@zeppos/zml`)**.

---

## 1. System Architecture and Roles

In the Zepp OS ecosystem, an application typically consists of two main parts running on different devices:

```
+-----------------------------------+             +-----------------------------------+
|      WATCH (Device App)           |             |      PHONE (Side Service)         |
|  Runs directly on the watch       |             |  Runs in the Zepp app on the phone|
|                                   |             |                                   |
|   +---------------------------+   |             |   +---------------------------+   |
|   |          PAGES            |   |             |   |         APP-SIDE          |   |
|   |  (UI, sensors, local logic) |   |             |   | (API fetching, network)   |   |
|   +---------------------------+   |             |   +---------------------------+   |
|                 |                 |             |                 ^                 |
|                 | this.request()  |             |                 | onRequest()     |
|                 v                 | <=========> |                 |                 |
|            (Watch side)           |   Bluetooth |             (Phone side)          |
|                 ^                 |             |                 |                 |
|                 | onCall()        |             |                 | this.call()     |
|                 +-----------------+             +-----------------+-----------------+
```

1. **Watch (Device App / `page`)**:
   - Runs directly on the watch's processor.
   - Handles UI (`@zos/ui`), user interactions, and device sensors.
   - **Code location**: `page/` directory (e.g., `page/index.js`).
   - Does not have direct internet access.

2. **Phone (Side Service / `app-side`)**:
   - Runs in the background of the Zepp app on the phone.
   - Handles network operations, API fetching, and heavy data processing.
   - **Code location**: `app-side/` directory (e.g., `app-side/index.js`).

---

## 2. Zepp OS 3.0 Project Structure

A standard Zepp OS 3.0 project follows this structure:

```text
my-app/
├── app.json                # Main manifest file
├── app.js                  # Global application lifecycle
├── package.json            # NPM dependencies (e.g., @zeppos/zml)
├── app-side/               # PHONE CODE
│   └── index.js            # Entry point for Side Service
├── page/                   # WATCH CODE
│   ├── index.js            # Main page view
│   ├── index.r.layout.js   # Round screen layout
│   └── index.s.layout.js   # Square screen layout
└── assets/                 # Static assets
```

### Key Files
- **`app.json`**: Defines app metadata, permissions, and module paths (`page` and `app-side`).
- **`package.json`**: Ensure `@zeppos/zml` is added as a dependency.

---

## 3. Communication API (ZML)

The `@zeppos/zml` library simplifies Bluetooth communication using Promises.

### Scenario 1: Watch -> Phone (Request/Response)
The watch requests data from the phone, and the phone responds asynchronously.

**Watch (`page/index.js`)**:
```javascript
import { BasePage } from "@zeppos/zml/base-page";

Page(BasePage({
  fetchData() {
    this.request({ method: "GET_DATA", params: { id: 1 } })
      .then((data) => { console.log("Received:", data); })
      .catch((err) => { console.error("Error:", err); });
  }
}));
```

**Phone (`app-side/index.js`)**:
```javascript
import { BaseSideService } from "@zeppos/zml/base-side";

AppSideService(BaseSideService({
  onRequest(req, res) {
    if (req.method === "GET_DATA") {
      // Simulate network request
      fetch("https://api.example.com/data")
        .then(response => response.json())
        .then(data => res(null, { result: data }))
        .catch(err => res(err, null));
    }
  }
}));
```

### Scenario 2: Phone -> Watch (Push/Events)
The phone sends an unsolicited message to the watch.

**Phone (`app-side/index.js`)**:
```javascript
AppSideService(BaseSideService({
  // Push update to the watch
  sendUpdate(data) {
    this.call({ action: "UPDATE_UI", result: data });
  }
}));
```

**Watch (`page/index.js`)**:
```javascript
Page(BasePage({
  onCall(req) {
    if (req.action === "UPDATE_UI") {
      console.log("Update received:", req.result);
    }
  }
}));
```

---

## Summary of Communication API

| Sender | Method | Receiver | Handler | Model |
| :--- | :--- | :--- | :--- | :--- |
| **Watch** (Page) | `this.request()` | **Phone** (Side Service) | `onRequest(req, res)` | Request-Response |
| **Phone** (Side Service) | `this.call()` | **Watch** (Page) | `onCall(req)` | Push/Event |

---

## 6. How to Create a New Project

1. **Initialize**: Create the folder structure and initialize `package.json` with `@zeppos/zml`.
2. **Configure `app.json`**: Set `configVersion` to `v3` and define module paths.
3. **Develop Watch UI**: Use `BasePage` and `this.request()` for data.
4. **Develop Phone Service**: Use `BaseSideService` and `onRequest()` to process data.
