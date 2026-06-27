# ZeppOs-Doc

This project serves as a comprehensive documentation repository designed for AI models. It provides essential guidelines, best practices, and technical instructions for developing applications for the Zepp OS platform.

## Documentation Overview

You can find the detailed documentation in the `doc/` directory:

- [AI Introduction & Best Practices](doc/ai-intro.md) - General guidelines and performance optimization for AI.
- [UI Instructions](doc/ui-instructions.md) - Guidelines on creating widgets, screen adaptation, and using the `@zos/ui` library.
- [App Lifecycle & Routing](doc/app-lifecycle-instructions.md) - Instructions on application lifecycle (`App`, `Page`) and page navigation.
- [Sensors](doc/sensors-instructions.md) - Best practices for handling sensor data, managing permissions, and resource cleanup.
- [File System (FS)](doc/fs-instructions.md) - Guidelines on synchronous file operations, file descriptor management, and error handling.

## MCP Server

This repository includes an MCP (Model Context Protocol) server to allow AI agents to directly access and search the documentation.

### Setup and Usage

1.  **Prerequisites**: Ensure you have Node.js installed.
2.  **Install dependencies**:
    ```bash
    cd mcp
    npm install
    ```
3.  **Run the server**:
    ```bash
    node mcp/server.js
    ```

### Connecting to AI Agents (e.g., Claude Desktop)

To connect this MCP server to an AI agent that supports MCP (like Claude Desktop), add it to your configuration file (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "zeppos-docs": {
      "command": "node",
      "args": ["<PATH_TO_PROJECT>/mcp/server.js"]
    }
  }
}
```

_Replace `<PATH_TO_PROJECT>` with the absolute path to this project directory._
