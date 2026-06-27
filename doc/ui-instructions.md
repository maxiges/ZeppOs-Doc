---
title: AI - Practice UI
sidebar_label: AI - Practice UI
description: Comprehensive guidelines for creating responsive Zepp OS user interfaces, including widget utilization, screen adaptation, layout strategies, and best practices for widget lifecycle management.
---

# UI Interactions

## UI model

- Build UI with `hmUI.createWidget(...)` from `@zos/ui`.
- Size and position for watch screens:
- Use `px(...)` from `@zos/utils` when the project relies on design-width scaling.

## Official references

- UI createWidget: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/createWidget/
- UI deleteWidget: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/deleteWidget/
- UI widget modify widget - setProperty https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/setProperty/
- UI widget get widget params - getProperty https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/getProperty/

## UI components

- TEXT createWidget: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/TEXT/
- BUTTON: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/createWidget/widget/BUTTON/
- IMG: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/IMG/
- FILL_RECT: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/FILL_RECT/
- STROKE_RECT: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/STROKE_RECT/
- CIRCLE: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CIRCLE/
- ARC: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/ARC/
- CANVAS: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CANVAS/
- KEYBOARD: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/KEYBOARD/
- IMG_ANIM: https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/widget/IMG_ANIM/
- QRCODE: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/QRCODE/

## UI Other

- Screen adaptation Specification: https://docs.zepp.com/docs/guides/framework/device/screen-adaption/

# Zepp OS UI Interactions & Component Guide

## UI Model & Best Practices

- **Create UI widgets** using [`createWidget(widgetId, option)`](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/createWidget/) from `@zos/ui`.
- **Always use** [`px()`](https://docs.zepp.com/docs/guides/framework/device/screen-adaption/#px-utility-function) from `@zos/utils` on numeric values for all coordinates, sizes, and font sizes to ensure proper screen adaptation.
  
### Technical Note on `px()` and `DEVICE_WIDTH`
The `px(x)` function calculates the scaled value based on the device's `DEVICE_WIDTH`.
Formula: `Math.ceil(x / designWidth * DEVICE_WIDTH)`

- **GTR 3 PRO** (designWidth=480, DEVICE_WIDTH=480):
  `px(100) = Math.ceil(100 / 480 * 480) = 100`
- **GTR 3** (designWidth=480, DEVICE_WIDTH=454):
  `px(100) = Math.ceil(100 / 480 * 454) = 95`

**Crucial Rule**: Always ensure your `app.json` contains the correct `designWidth` configuration, and be aware that `px()` results are calculated dynamically based on the target device's physical screen width.

- **Screen adaptation:** Follow the [Screen adaptation Specification](https://docs.zepp.com/docs/guides/framework/device/screen-adaption/) for layout, resource directories, and `app.json` config.

## Core UI Widgets (with API links)

- [TEXT](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/TEXT/): Display text, supports alignment, font, color, wrapping, and i18n.
- [BUTTON](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/BUTTON/): Tap actions, customizable text, color, and radius.
- [IMG](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/IMG/): Display images, supports scaling, rotation, and transparency.
- [FILL_RECT](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/FILL_RECT/): Solid color rectangles, supports radius and alpha.
- [STROKE_RECT](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/STROKE_RECT/): Outlined rectangles, supports line width and radius.
- [CIRCLE](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CIRCLE/): Draw circles with color and alpha.
- [ARC](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/ARC/): Draw arcs, set start/end angle, color, and width.
- [CANVAS](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CANVAS/): Custom drawing (lines, shapes, text, images) via imperative API.
- [KEYBOARD](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/KEYBOARD/): In-page text input, custom keys, and callbacks.
- [IMG_ANIM](https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/widget/IMG_ANIM/): Frame-sequence animation (see [latest version](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/IMG_ANIM/)).
- [QRCODE](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/QRCODE/): Display QR codes with optional background.

## Layout & Grouping

- [GROUP](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/GROUP/): Group widgets for unified show/hide and event handling. Cannot be nested.
- [VIEW_CONTAINER](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/VIEW_CONTAINER/): Powerful scrollable container, supports child widgets, z-index, and Swiper mode.

## Design & Adaptation

- **Design for:**
  - Round: 480x480 px
  - Square: 390x450 px
  - Band: 194x368 px
- **Resource directories** and layout files must match screen type (see [spec](https://docs.zepp.com/docs/guides/framework/device/screen-adaption/#resource-file-directory-specification)).
- **Use `zosLoader:`** to import layout files for each screen type.

## Widget Creation Example

```js
import { createWidget, widget, align, text_style } from "@zos/ui";
import { px } from "@zos/utils";

const text = createWidget(widget.TEXT, {
  x: px(96),
  y: px(40),
  w: px(288),
  h: px(48),
  color: 0xffffff,
  text_size: px(36),
  align_h: align.CENTER_H,
  align_v: align.CENTER_V,
  text_style: text_style.WRAP,
  text: "HELLO, Zepp OS",
});
```

## Additional Resources

- [Screen adaptation Specification](https://docs.zepp.com/docs/guides/framework/device/screen-adaption/)
- [UI createWidget API](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/createWidget/)
- [All widget docs](https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/)

## How to check if the watch is in Always on display mode

```js

 var screenType = getScene()
        if (screenType == SCENE_AOD) {
```

---

**Notes:**

- Always wrap all x, y, w, h, and text_size values with `px()` unless using actual device dimensions.
- For images, set `w`, `h`, and `auto_scale: true` for best adaptation.
- Use `getTextLayout` for multi-line text sizing.
- For advanced layouts, use `VIEW_CONTAINER` and Swiper mode.
- For animation, prefer `IMG_ANIM` (see v2 and v3+ docs for differences).
