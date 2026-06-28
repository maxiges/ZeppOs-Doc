---
title: AI - AppSettingsPage Reference
sidebar_label: AI - AppSettingsPage
description: Guide on using AppSettingsPage on the mobile side and syncing data to the Side Service.
---

# AppSettingsPage Reference

The Phone-side settings page (`setting/index.js`) allows developers to build a user interface inside the Zepp mobile app where users can configure settings (e.g., entering API keys, selecting preferences, or triggering sync). 

Settings are stored in a persistent key-value store and automatically synchronized to the App-side Side Service.

---

## Basic Concept

The Phone-side settings page is defined using the global `AppSettingsPage()` function. This page is built using predefined UI component functions (like `Section`, `TextInput`, `Toggle`, `Button`, etc.) in a declarative, React-like render function named `build(props)`.

The `props` object passed to the `build` function contains a `settingsStorage` property, which acts as the main interface to modify and read the configuration.

```
┌──────────────────────────────────────────────┐
│             AppSettingsPage                  │
│                                              │
│  props.settingsStorage.setItem(key, value)   │
└──────────────────────┬───────────────────────┘
                       │
                       │ (Automatically synchronized by ZeppOS)
                       ▼
┌──────────────────────────────────────────────┐
│             BaseSideService                  │
│                                              │
│  onSettingsChange({ key, newValue, ... })    │
└──────────────────────────────────────────────┘
```

---

## The `settingsStorage` API

Within `AppSettingsPage`, you access `settingsStorage` via `props.settingsStorage`. It provides the following methods:

| Method | Description |
| :--- | :--- |
| `setItem(key, value)` | Stores a value under the specified key. This triggers a change event. |
| `getItem(key)` | Retrieves the value of the specified key. |
| `removeItem(key)` | Removes the specified key and its associated value. |

> [!IMPORTANT]
> When `setItem` is called on the settings page, ZeppOS automatically serializes the data, sends it to the phone's background process, and triggers the `onSettingsChange` hook of your registered `BaseSideService`.

---

## Example Usage

Here is a complete example of a Settings Page (`setting/index.js`) displaying a text input and a toggle switch, writing changes directly to `settingsStorage`:

```javascript
AppSettingsPage({
  build(props) {
    // 1. Retrieve current settings values to render the initial UI state
    const username = props.settingsStorage.getItem('username') || '';
    const notificationsEnabled = props.settingsStorage.getItem('notifications') === 'true';

    return Section({}, [
      // Section Header
      Text({
        style: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }
      }, ['User Profile Settings']),

      // Text Input for Username
      TextInput({
        label: 'Username',
        value: username,
        onChange: (val) => {
          // Store the new value. This automatically triggers BaseSideService.onSettingsChange
          props.settingsStorage.setItem('username', val);
        }
      }),

      // Toggle Switch for Notifications
      Toggle({
        label: 'Enable Notifications',
        value: notificationsEnabled,
        onChange: (isChecked) => {
          // Store boolean value as string (or serializable format)
          props.settingsStorage.setItem('notifications', isChecked);
        }
      })
    ]);
  }
});
```

---

## How to Handle Settings Changes on App-side (Side Service)

On the Side Service (`app-side/index.js`), you can intercept the settings changes made above by implementing the `onSettingsChange` hook:

```javascript
import { BaseSideService } from '@zeppos/zml/base-side'

BaseSideService({
  onSettingsChange({ key, newValue, oldValue }) {
    this.log(`Settings change detected! Key: ${key}`);

    if (key === 'username') {
      this.log(`Username updated to: ${newValue}`);
      // Perform actions like logging in or updating API headers
    }

    if (key === 'notifications') {
      this.log(`Notifications toggled to: ${newValue}`);
      // Enable or disable background notification synchronization
    }
  }
})
```

---

## Related Documents

- [BaseSideService Reference](base-side-service-reference.md)
- [Core Concepts](core-concepts.md)
