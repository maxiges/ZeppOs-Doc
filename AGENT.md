# Zepp OS Documentation Overview for AI Agents

This repository contains essential documentation for developing Zepp OS applications. This file serves as an index and overview to assist AI models in navigating the available technical guides.

## Documentation Index

- [AI Best Practices Introduction](doc/ai-intro.md) - Overview of best practices for Zepp OS application development, focusing on performance and global state management.
- [App Lifecycle & Routing](doc/app-lifecycle-instructions.md) - Detailed guide on App/Page lifecycle management and navigation.
- [File System (FS) Guide](doc/fs-instructions.md) - Instructions for safe and efficient file system operations.
- [Sensors Guide](doc/sensors-instructions.md) - Comprehensive guide for utilizing Zepp OS sensor APIs and managing sensor lifecycles.
- [UI Interactions & Components](doc/ui-instructions.md) - Guidelines for creating responsive user interfaces and managing UI widgets.

## Core Compliance Checklist for AI Agents

Before proceeding with any implementation, please verify the following:

- **UI Development**: When adding or modifying UI elements, **you MUST** consult [UI Interactions & Components](doc/ui-instructions.md) to ensure proper widget creation, usage of `px()` for adaptation, and screen layout compliance.
- **App/Page Lifecycle**: Ensure all `App()` and `Page()` logic adheres to the [App Lifecycle & Routing](doc/app-lifecycle-instructions.md) guide, especially regarding proper cleanup in `onDestroy()`.
- **Resources & Sensors**: Always check [Sensors Guide](doc/sensors-instructions.md) and [File System (FS) Guide](doc/fs-instructions.md) to handle sensors, files, and file descriptors correctly, ensuring all listeners are stopped and handles are closed.
- **Knowledge Verification**: If you are unsure about the implementation details of any feature, stop and read the relevant document in the `/doc` folder first.
