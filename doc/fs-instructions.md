---
title: AI - Practice File System (FS)
sidebar_label: AI - Practice File System (FS)
description: This guide provides essential practices for safe and efficient file system operations in Zepp OS, including file handling, error management, and resource cleanup.
---

# File System (FS) Guide for AI

This guide helps AI models use the Zepp OS FS API correctly, ensuring safe file operations and proper resource management.

## Official References

- [All FS Docs](https://docs.zepp.com/docs/reference/device-app-api/newAPI/fs/)

---

## 1. General Principles

1.  **Sync Operations**: Most FS operations in Zepp OS are synchronous (`...Sync`). This means they block execution. **Avoid** large file operations in the main UI thread to prevent stuttering/crashes.
2.  **Path Limitations**: Files are primarily accessed within the application's `/data` directory.
3.  **File Descriptors**: Always close file handles using `closeSync()` after you are finished to avoid memory leaks.
4.  **Error Handling**: Files might not exist or might be locked. Always wrap operations in `try-catch` blocks.

---

## 2. Common Patterns

### Writing to a File

```js
import { openSync, writeSync, closeSync, O_RDWR, O_CREAT } from '@zos/fs'

function writeData(filename, content) {
  try {
    const fd = openSync({
      path: filename,
      flag: O_RDWR | O_CREAT
    })
    
    const buffer = new TextEncoder().encode(content)
    writeSync({
      fd,
      buffer,
      length: buffer.length
    })
    
    closeSync({ fd })
  } catch (e) {
    console.error('Failed to write file:', e)
  }
}
```

### Reading from a File

```js
import { openSync, readSync, closeSync, O_RDONLY } from '@zos/fs'

function readFile(filename) {
  try {
    const fd = openSync({
      path: filename,
      flag: O_RDONLY
    })
    
    // Determine size first or use a fixed buffer
    const buffer = new ArrayBuffer(1024)
    const bytesRead = readSync({
      fd,
      buffer,
      length: 1024
    })
    
    const content = new TextDecoder().decode(buffer.slice(0, bytesRead))
    closeSync({ fd })
    return content
  } catch (e) {
    console.error('Failed to read file:', e)
  }
}
```

---

## AI Implementation Checklist

- [ ] Are all `openSync` calls paired with `closeSync`?
- [ ] Are file operations wrapped in `try-catch`?
- [ ] Is `O_RDONLY`, `O_WRONLY`, `O_RDWR` used correctly with bitwise `|` for flags like `O_CREAT`?
- [ ] Are blocking operations kept off the main UI thread if performance is critical?
