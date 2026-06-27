---
title: AI - Practice Storage Management
sidebar_label: AI - Practice Storage Management
description: Guide to choosing between Local Storage and File System for Zepp OS applications.
---

# Storage Management Guide for AI

Choosing the right storage mechanism is critical for performance and data integrity in Zepp OS.

## 1. Local Storage (`@zos/storage`)
- **Use Case**: Small amounts of data (e.g., user preferences, simple settings, flags).
- **Behavior**: Key-value pair based. Fast read/write access.
- **Limitation**: Not suitable for large datasets or files.

## 2. File System (`@zos/fs`)
- **Use Case**: Large amounts of data (e.g., logging, images, user data records, large JSON blobs).
- **Behavior**: File-based operations. Offers fine-grained control but requires proper handle management.
- **Requirement**: Always wrap in `try-catch`, and always use `closeSync()` to avoid memory leaks.

## 3. Best Practices
- Never store large objects in Local Storage.
- For structured data, use JSON serialization for File System files.
- Always validate data size before writing.
