---
title: AI - Troubleshooting & FAQ
sidebar_label: AI - FAQ
description: Troubleshooting guides for common messaging, performance, and configuration issues.
---

# Troubleshooting & FAQ

Common questions and issues when developing with ZML.

---

## Troubleshooting

### Q: My App-side messages are not being received on the Device-side.
*   **Plugin pre-registration**: ZML automatically registers the messaging plugin on both `BasePage` (Device-side) and `BaseSideService` (App-side) via `zml-page.js` and `zml-side-service.js`. You do **not** need to call `BasePage.use(messagingPlugin)` manually.
*   **Verify import source**: Ensure you are importing from the correct ZML entry points — `@zeppos/zml/base-page` and `@zeppos/zml/base-side` — which include the pre-configured plugins. Importing from `base-page.js` or `base-side-service.js` directly will skip plugin registration.
*   **Debug Messaging**: Use `this.log()` inside `onCall` and `onRequest` to verify the message is being emitted and the listener is correctly attached.

### Q: Page performance is slow.
*   **Analyze `build()`**: Ensure you aren't doing complex calculations or synchronous blocking calls inside `build()` or `onInit()`. Move these tasks to `BaseSideService`.
*   **Check plugin overhead**: Ensure you haven't overloaded the page with unnecessary plugins.

### Q: Settings updates aren't reflecting in the app.
*   **Verify Hook Definition**: Implement `onSettingsChange({ key, newValue, oldValue })` in your `BaseSideService` definition. The `settingsPlugin` (which is automatically registered) subscribes to settings changes and calls this hook for you — no manual setup is needed.
*   **Launch Reason Handling**: If the Side Service was not running when a setting changed, ZeppOS will relaunch it. ZML automatically detects the `settingsChanged` launch reason and invokes `onSettingsChange` with the launch arguments on `onInit`.
*   **Check Platform**: Ensure the platform supports the settings features you are using.

---

## FAQ

### Q: Can I use ZML with standard ZeppOS APIs?
Yes, ZML is a wrapper/middleware. You can still use all standard `@zos/*` APIs directly alongside ZML components.

### Q: How do I create a custom ZML plugin?
A plugin is a **factory function** that returns a handler object containing lifecycle methods (`onInit`, `onDestroy`, etc.) and/or custom methods to mix into the page/service instance. Register it with `BasePage.use()` or `BaseSideService.use()`.

```javascript
// my-plugin.js
export function myPlugin() {
  return {
    onInit() {
      // Runs during page/service initialization
      this.myMethod() // Methods are mixed into `this`
    },
    onDestroy() {
      // Cleanup logic here
    },
    myMethod() {
      this.log('Custom plugin method called')
    },
  }
}

// In your entry file:
import { BasePage } from '@zeppos/zml/base-page'
import { myPlugin } from './my-plugin.js'

BasePage.use(myPlugin)
```

> [!NOTE]
> Plugin methods (other than lifecycle hooks like `onInit`, `onDestroy`, `build`, `onResume`, `onPause`) are automatically merged into the page/service instance's `this` context, making them accessible in your custom code.

