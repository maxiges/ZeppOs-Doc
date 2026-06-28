---
title: AI - Best Practices
sidebar_label: AI - Best Practices
description: Recommended patterns for resource management, performance optimization, and plugin usage.
---

# Best Practices

Follow these recommended patterns to ensure your ZeppOS application, built with ZML, is performant, stable, and maintainable.

---

## 1. Resource Management
ZeppOS devices have limited resources. Always clean up what you initialize.

*   **Use `onDestroy()`**: Always implement `onDestroy()` in `BasePage` and `BaseSideService` to remove event listeners, stop timers, or close file streams.
*   **Dispose Resources**: If using plugins that create objects (like `fileTransfer` or `messaging`), ensure they are properly disposed of if required by the plugin API.

## 2. Performance
*   **UI-side Efficiency**: Keep the `BasePage` `build()` and logic methods lightweight. Perform heavy computations (image processing, large data parsing) in `BaseSideService`.
*   **Messaging**: Keep messages between Device-side and App-side small and infrequent. Batch data updates if possible instead of sending individual updates for every small state change.
*   **Settings**: Subscribe to settings changes (`settingsLib.onChange`) only when necessary, and unsubscribe using `settingsLib.offChange` if the service or page is destroyed. (Note: ZML handles settings changes automatically if you register `onSettingsChange` on `BaseSideService`).

## 3. Plugin Usage
*   **Register Once**: Register plugins at the top level of your `BaseApp` or `BasePage` definition, not within lifecycle methods, to avoid multiple registrations.
*   **Keep Plugins Lightweight**: When creating custom plugins, ensure they do not introduce significant overhead to the lifecycle event processing chain.

## 4. Code Organization
*   **Structure**: Keep your ZML-based code separated into clear `app-side/`, `page/`, and `shared/` directories following the ZML examples.
*   **Modularize**: Break down complex UI pages into smaller components using the plugin system or utility modules.
