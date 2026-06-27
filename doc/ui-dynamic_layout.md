---
title: AI - Practice Dynamic Layouts
sidebar_label: AI - Practice Dynamic Layouts
description: Guide to the dynamic layout system introduced in Zepp OS 4.0, including virtual containers and flexible layout properties.
---

# Zepp OS 4.0: Dynamic Layouts Guide

Zepp OS 4.0 introduces a powerful dynamic layout system that allows developers to create flexible, responsive UIs using CSS-like properties directly within JavaScript.

---

## 1. Core Concepts

Dynamic layouts in Zepp OS 4.0 leverage a virtual container model and flexbox-like styling.

### Key Components
- **`widget.VIRTUAL_CONTAINER`**: Acts as a parent container that manages child widgets using CSS layout rules.
- **`updateLayout()`**: A function that triggers a recalculation and re-rendering of the layout, necessary when adding, removing, or changing styles of widgets.
- **`updateLayoutStyle()`**: A method on widget containers to dynamically change layout properties (e.g., flex settings, padding, margins).

---

## 2. Using Dynamic Layouts: Step-by-Step

### Step 1: Create a Container
Use `createWidget` with `widget.VIRTUAL_CONTAINER` to define the root of your layout.

```javascript
import { createWidget, widget } from '@zos/ui';

// Create a container with initial layout styles
const rootContainer = createWidget(widget.VIRTUAL_CONTAINER, { 
  layout: {
    "display": "flex",
    "width": "100%",
    "height": "100%",
    "flex-direction": "column"
  } 
});
```

### Step 2: Add Widgets
Add child widgets to the container by specifying the `parent` property.

```javascript
createWidget(widget.BUTTON, {
  parent: rootContainer,
  text: "My Button",
  layout: {
    "width": "80vw",
    "height": "50px"
  }
});
```

### Step 3: Update Layout Dynamically
To change layout properties at runtime (e.g., changing flex direction, padding, or size):

1. **Use `updateLayoutStyle`**: Update the style object of the container or widget.
2. **Call `updateLayout`**: Refresh the UI to apply the changes.

```javascript
import { updateLayout } from '@zos/ui';

// Update layout properties
rootContainer.updateLayoutStyle({
  "flex-direction": "row",
  "padding": "10px"
});

// Re-render
updateLayout();
```

---

## 3. Supported Dynamic Properties

The Zepp OS 4.0 layout system supports CSS-like properties, including:

- **Flexbox**: `display: flex`, `flex-flow`, `justify-content`, `align-items`, `align-content`, `flex-grow`, `gap`.
- **Spacing**: `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`.
- **Sizing**: `width`, `height` (supports `px`, `vw`, `vh`).
- **Positioning**: `x`, `y` (supports absolute positioning or `vw`/`vh`).

---

## 4. Key Best Practices

- **Group Widgets**: Use `widget.GROUP` for logical grouping of related UI elements.
- **Refresh Efficiently**: Call `updateLayout()` only when necessary (e.g., after a batch of changes) to optimize performance.
- **Responsive Design**: Use viewport units (`vw` - percentage of viewport width, `vh` - percentage of viewport height) for responsive elements across different screen sizes.
- **Tags**: Use `layout.tags` for specific layout behaviors (e.g., `ignore-layout` for absolute positioning overriding flexbox).
