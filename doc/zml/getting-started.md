---
title: AI - Getting Started
sidebar_label: AI - Getting Started
description: Installation guide and basic structure of ZeppOS applications using ZML.
---

# Getting Started with ZML

ZML (ZeppOS Middleware Library) is designed to simplify the development of ZeppOS applications by providing modular plugins and extended base classes for Apps and Pages.

## Core Philosophy

ZML follows a plugin-based architecture. Instead of inheriting from monolithic base classes, ZML allows you to compose functionality using `.use()` to register plugins on demand.

---

## Installation

Install `@zeppos/zml` as a dependency in your ZeppOS project:

```bash
npm install @zeppos/zml
```

---

## Basic Structure

### 1. App Definition
Use `BaseApp` to define your application, applying the necessary plugins.

```javascript
import { BaseApp } from '@zeppos/zml/base-app';

App(
  BaseApp({
    onCreate() {
      console.log('App created');
    },
    onDestroy() {
      console.log('App destroyed');
    },
  }),
);
```

### 2. Page Definition
Use `BasePage` for page components.

```javascript
import { BasePage } from '@zeppos/zml/base-page';

Page(
  BasePage({
    onInit() {
      console.log('Page initialized');
    },
  }),
);
```
