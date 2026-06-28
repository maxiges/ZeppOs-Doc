---
title: AI - Architecture & Data Flow
sidebar_label: AI - Advanced Guides
description: High-level overview of Device-side/App-side communication and data synchronization.
---

# Advanced Guides: Architecture & Data Flow

This guide provides a high-level overview of how ZML components work together. For detailed technical specifications, please refer to the dedicated reference files.

---

## Architectural Overview

ZML splits logic between the **Device-side** (the watch) and the **App-side** (the companion service on the phone).

*   **[BasePage Reference](base-page-reference.md)**: Use this for all UI-bound logic on the ZeppOS device. It manages page lifecycles (`build`, `onResume`, etc.) and handles UI-related plugin integration.
*   **[BaseSideService Reference](base-side-service-reference.md)**: Use this for background services, companion app logic, and heavy processing. It runs on the phone-side, handling settings, file transfers, and backend messaging.
*   **[AppSettingsPage Reference](app-settings-page.md)**: Use this to build settings user interfaces on the mobile app settings page and synchronize data to the side service.

---

## Data & File Transfer Flow

The power of ZML lies in the seamless bridge between these two environments via plugins.

### 1. Messaging (Request/Response)

Use this for small data exchanges (e.g., UI state, sensor data, button clicks).

*   **Device to App**: Device Page requests data -> App-side listens via `messaging` plugin.
*   **App to Device**: App-side sends message -> Device Page listens via `messaging` plugin.

### 2. File Transfer

Use this for moving files (images, logs, configuration files).

*   **App to Device**: `fileTransfer` plugin on `BaseSideService` uploads to the device.
*   **Device to App**: `fileTransfer` plugin on `BasePage` sends files to the app-side.

---

## Communicating Settings

Settings defined in the ZeppOS app configuration are accessed primarily via the App-side.

1.  **Read/Watch**: Use `settingsLib` in `BaseSideService` to get or subscribe to setting changes using the `onSettingsChange` hook or the `onChange` event callback.
2.  **Sync**: If the device needs updated settings, the App-side should push these changes via the `messaging` plugin to the `BasePage` instance.

