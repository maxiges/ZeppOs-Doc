# Zepp OS Documentation Overview for AI Agents

This repository contains essential documentation for developing Zepp OS applications. This file serves as an index and overview to assist AI models in navigating the available technical guides.

## Documentation Index

- [AI Best Practices Introduction](doc/ai-intro.md) - Overview of best practices for Zepp OS application development, focusing on performance and global state management.
- [App Lifecycle & Routing](doc/app-lifecycle-instructions.md) - Detailed guide on App/Page lifecycle management and navigation.
- [App Manifest Guide](doc/app-manifest-guide.md) - Guide for configuring app.json, including permissions and runtime settings.
- [Assets Management](doc/assets-management.md) - Best practices for managing assets, resources, and screen adaptation.
- [Communication](doc/communication.md) - Guide on watch-phone communication using ZML.
- [Dynamic Layouts Guide](doc/ui-dynamic_layout.md) - Guide to the dynamic layout system introduced in Zepp OS 4.0, including virtual containers and flexible layout properties.
- [File System (FS) Guide](doc/fs-instructions.md) - Instructions for safe and efficient file system operations.
- [Internationalization (i18n)](doc/i18n-instructions.md) - Guide on multi-language support.
- [Sensors Guide](doc/sensors-instructions.md) - Comprehensive guide for utilizing Zepp OS sensor APIs and managing sensor lifecycles.
- [Storage Management](doc/storage-instructions.md) - Guidelines for Local Storage vs File System.
- [UI Interactions & Components](doc/ui-instructions.md) - Guidelines for creating responsive user interfaces and managing UI widgets.

## Core Compliance Checklist for AI Agents

Before proceeding with any implementation, please verify the following:

- **App Configuration**: Consult [App Manifest Guide](doc/app-manifest-guide.md) for `app.json` configuration, permissions, and runtime settings.
- **UI Development**: When adding or modifying UI elements, **you MUST** consult [UI Interactions & Components](doc/ui-instructions.md) to ensure proper widget creation, usage of `px()` for adaptation, and screen layout compliance.
- **Dynamic Layouts**: For Zepp OS 4.0 projects, consult [Dynamic Layouts Guide](doc/ui-dynamic_layout.md) for responsive, flexbox-based layout implementation.
- **Assets & Adaptation**: Follow [Assets Management](doc/assets-management.md) for resources and screen adaptation.
- **App/Page Lifecycle**: Ensure all `App()` and `Page()` logic adheres to the [App Lifecycle & Routing](doc/app-lifecycle-instructions.md) guide, especially regarding proper cleanup in `onDestroy()`.
- **Communication**: When implementing watch-phone communication, consult [Communication](doc/communication.md) for correct usage of `@zeppos/zml` and appropriate handlers.
- **Resources & Sensors**: Always check [Sensors Guide](doc/sensors-instructions.md), [File System (FS) Guide](doc/fs-instructions.md), and [Storage Management](doc/storage-instructions.md) to handle sensors, files, and local storage correctly.
- **Localization**: Ensure multi-language support follows [Internationalization (i18n)](doc/i18n-instructions.md).
- **Knowledge Verification**: If you are unsure about the implementation details of any feature, stop and read the relevant document in the `/doc` folder first.
