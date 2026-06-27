---
title: AI - Practice Sensors
sidebar_label: AI - Practice Sensors
description: A comprehensive guide on utilizing Zepp OS sensor APIs, including best practices for permission management, data streaming, resource allocation, and proper lifecycle cleanup.
---

# Sensors Guide for AI

This guide helps AI models use the Zepp OS sensor APIs correctly, manage permissions, and handle data streaming.

## Official References

- [Sensors API Reference](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/)

### Individual Sensor Documentation

- [Accelerometer](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Accelerometer/): Measures device acceleration along x, y, z axes.
- [Barometer](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Barometer/): Measures atmospheric pressure.
- [Battery](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Battery/): Provides device battery level and charging status.
- [BloodOxygen (SPO2)](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/BloodOxygen/): Measures blood oxygen saturation levels.
- [BodyTemperature](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/BodyTemperature/): Measures the user's body temperature.
- [Buzzer](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Buzzer/): Controls the device buzzer for haptic/audio feedback.
- [Calorie](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Calorie/): Tracks calories burned.
- [Compass](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Compass/): Provides orientation data (heading).
- [Distance](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Distance/): Measures distance traveled.
- [FatBurning](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/FatBurning/): Tracks fat burning metrics.
- [Geolocation](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Geolocation/): Provides GPS coordinates (latitude, longitude, etc.).
- [Gyroscope](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Gyroscope/): Measures angular velocity (rotation).
- [HeartRate](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/HeartRate/): Measures heart rate (BPM).
- [Pai](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Pai/): Provides PAI (Personal Activity Intelligence) score.
- [Sleep](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Sleep/): Tracks sleep stages and duration.
- [Stand](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Stand/): Tracks standing activity.
- [Step](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Step/): Counts steps taken (pedometer).
- [Stress](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Stress/): Measures stress levels.
- [Time](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Time/): Provides system time and date information.
- [Vibrator](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Vibrator/): Controls the vibration motor for alerts/feedback.
- [Wear](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Wear/): Detects if the device is being worn on the wrist.
- [Weather](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Weather/): Provides current weather conditions.
- [Workout](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Workout/): Manages workout session data.
- [WorldClock](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/WorldClock/): Provides time data for different time zones.

---

## 1. General Principles

1.  **Check Permissions**: Every sensor requires a specific permission code. **Always check** the documentation for the sensor and include the necessary permission in `app.json`.
2.  **Start/Stop**: Most sensors need explicit `start()` / `stop()` or `on...()` / `off...()` calls to manage resource usage and battery.
3.  **Lifecycle**: Always stop listening to sensors in the `onDestroy()` lifecycle method of your Page or App to prevent memory leaks and battery drain.

---

## 2. Common Patterns

### Continuous Data (e.g., Accelerometer)

```js
import { Accelerometer } from '@zos/sensor'

const accel = Accelerometer()

Page({
  onInit() {
    accel.start()
    accel.onChange(() => {
      const { x, y, z } = accel.getCurrent()
      console.log(`Accel: x=${x}, y=${y}, z=${z}`)
    })
  },
  onDestroy() {
    accel.stop()
  }
})
```

### Event-based or Periodic Data (e.g., HeartRate)

```js
import { HeartRate } from '@zos/sensor'

const hr = HeartRate()

Page({
  onInit() {
    hr.onCurrentChange(() => {
      const value = hr.getCurrent()
      console.log('Heart Rate:', value)
    })
  },
  onDestroy() {
    hr.offCurrentChange()
  }
})
```

---

## AI Implementation Checklist

- [ ] Does the `app.json` file contain the required permission?
- [ ] Is the sensor initialized properly?
- [ ] Are continuous listeners (`onChange`, `onCurrentChange`) stopped in `onDestroy()`?
- [ ] Is battery consumption considered? (Avoid high-frequency polling if not needed).
