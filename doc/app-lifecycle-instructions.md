---
title: AI - Practice App Lifecycle & Routing
sidebar_label: AI - Practice App Lifecycle & Routing
description: This guide covers application lifecycle management, App/Page registration, global state access, and routing navigation for Zepp OS applications.
---

# App Lifecycle & Routing Guide for AI

This guide helps AI models understand and write proper application-level logic, lifecycle management, and page transitions for Zepp OS.

## Official References

- [App registration: App()](https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/App/)
- [Page registration: Page()](https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/Page/)
- [Get App Instance: getApp()](https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/getApp/)
- [Get Page Instance: getCurrentPage()](https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/getCurrentPage/)
- [Router Module](https://docs.zepp.com/docs/reference/device-app-api/newAPI/router/push/)

---

## 1. Application Lifecycle (`app.js`)

Each Mini Program must have a single `app.js` file registered using the `App(...)` constructor. It defines global data and handles the initialization and termination of the app.

### Key Lifecycle Methods

- `onCreate(params)`: Triggered once when the app is launched. Use this to initialize global state or set up background services.
- `onDestroy()`: Triggered when the app is destroyed/exited. Use this to clean up resources.

### Global Data

- Data is stored in `globalData`.
- **Crucial Rule:** To access `globalData` outside of `app.js`, you must use `getApp()._options.globalData`, **not** `getApp().globalData`.

### Example `app.js`

```js title="app.js"
App({
  globalData: {
    userName: "Runner",
    score: 0,
  },
  onCreate(params) {
    console.log("App onCreate with params:", params)
    // Access globalData locally via this.globalData
    this.globalData.score = 100
  },
  onDestroy() {
    console.log("App onDestroy")
  }
})
```

---

## 2. Page Lifecycle (`page.js`)

Each page file must call the `Page(...)` constructor exactly once.

### Key Lifecycle Methods

- `onInit(params)`: Triggered when the page is initialized. It receives query parameters from router navigation (as a serialized JSON or query string). Use this to prepare data.
- `build()`: Triggered immediately after `onInit`. **This is where all UI creation logic must go.** Do not create widgets in `onInit`.
- `onDestroy()`: Triggered when the page is destroyed (popped or replaced). Clean up local timers, sensor listeners, and widgets.

### Page State

- Data is stored in `state`.
- **Crucial Rule:** To access or modify state inside the page's functions, use `this.state`.
- To access state from an external module or callback where `this` context is lost, retrieve it using `getCurrentPage()._options.state`.

### Example `page.js`

```js title="page/index.js"
import { createWidget, widget, align } from '@zos/ui'
import { px } from '@zos/utils'

Page({
  state: {
    message: "Welcome to Zepp OS",
    counter: 0,
  },
  onInit(params) {
    console.log("Page onInit. Received params:", params)
    if (params) {
      try {
        const parsed = JSON.parse(params)
        this.state.counter = parsed.initialValue || 0
      } catch (e) {
        console.log("Params was not JSON:", params)
      }
    }
  },
  build() {
    console.log("Page build UI")
    
    // Create text widget
    this.state.textWidget = createWidget(widget.TEXT, {
      x: px(50),
      y: px(100),
      w: px(380),
      h: px(50),
      color: 0xffffff,
      text_size: px(32),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text: `${this.state.message}: ${this.state.counter}`
    })
  },
  onDestroy() {
    console.log("Page onDestroy. Cleaning up...")
  }
})
```

---

## 3. Router Navigation (`@zos/router`)

Use the router module to navigate between pages.

### Navigation APIs

- `push(options)`: Navigates to a new page, adding it to the stack.
  - `url`: Path of the target page (e.g. `'page/detail'`).
  - `params`: String or object passed to the target page's `onInit(params)`. Objects are automatically stringified.
- `replace(options)`: Replaces the current page with a new one. The user cannot go back to the replaced page.
- `back()`: Navigates back to the previous page.
- `exit()`: Exits the Mini Program immediately.

### Example

```js
import { push, back, replace, exit } from '@zos/router'

// 1. Navigate to details page with a JSON object
push({
  url: 'page/detail',
  params: {
    userId: '12345',
    mode: 'dark'
  }
})

// 2. Go back
back()

// 3. Replace current page with a results page
replace({
  url: 'page/results',
  params: 'status=success'
})

// 4. Exit app
exit()
```

---

## AI Implementation Checklist

- [ ] Does `app.js` contain `App(...)`?
- [ ] Does every page contain `Page(...)`?
- [ ] Are all UI components generated inside `build()`?
- [ ] Is global data accessed outside `app.js` using `getApp()._options.globalData`?
- [ ] Is page state accessed outside the page constructor using `getCurrentPage()._options.state`?
- [ ] Are parameters in navigation handled correctly (string/object serialized to `onInit`)?
