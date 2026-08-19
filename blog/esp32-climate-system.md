# ESP32 Climate Monitoring System — Full Project Overview  
*A complete environmental monitoring system featuring an ESP32 firmware stack and a fully‑integrated host‑side analysis pipeline.*

---

## Project Overview
This project is a long‑term environmental monitoring system built around an **ESP32**, designed to collect climate‑relevant sensor data and transform it into a complete analysis package using a modular **host‑side toolchain**.

The system currently supports:

- **Local SD logging** of sensor readings  
- **Structured CSV output**  
- **A fully complete host‑side analysis pipeline**  
- **Trend detection, anomaly detection, statistics, sparklines, and PNG plot generation**  
- **A professional multi‑module architecture**  

The firmware is still under active development, while the host tool is **100% complete**.

---

# Repository Architecture

The project is organized into five major components, each documented in the architecture overview:

### **01_firmware/**
Firmware for the ESP32, including:
- Sensor drivers  
- Logging system  
- Error codes  
- Sleep cycle logic  
- Main application  

### **02_host_tool/**
A complete analysis pipeline including:
- CSV ingestion  
- Binary export  
- Statistics  
- Trend detection  
- Anomaly detection  
- Plot generation  
- Summary report creation  
- CLI flag parser  
- Unit tests + pipeline tests  
- Performance benchmarks  

### **03_data/**
Contains:
- Raw logs from the ESP32  
- Processed CSV files  
- Binary files (`output.bin`)  
- Analysis output  
- Generated plots  

### **04_docs/**
All documentation:
- Hardware setup  
- Firmware overview  
- Host tool pipeline  
- Architecture notes  
- Climate relevance  
- Engineering tradeoffs  

### **05_scripts/**
Automation helpers:
- Firmware flashing  
- Pipeline runner  
- Test runner  
- CSV conversion utilities  

---

# Firmware Status (Current)

The firmware is partially implemented and currently supports:

- **Structured repository layout**  
- **Sensor API analysis**  
- **SD logging design**  
- **Error handling design**  
- **Initial driver scaffolding**  

The following features are **planned but not yet implemented**:

- UART telemetry  
- CRC packet framing  
- Wi‑Fi log transfer endpoint  
- Low‑power benchmarks  
- Sensor self‑test mode  

The device **currently stores values locally** and does not transmit telemetry.

---

# Host‑Side Analysis Pipeline (Fully Complete)

The host tool transforms raw ESP32 logs into a complete environmental analysis package.  
It consists of **four major stages**, each implemented as a standalone module.

---

## 1. Sensor Data Ingestion  

### **CSV Discovery**
- Locates the newest CSV file produced by the firmware  
- Supports test overrides via environment variables  

### **CSV Parsing**
- Validates headers  
- Ensures file is present and non‑empty  
- Extracts timestamps + sensor values  

### **Value Extraction**
- Converts timestamps into minutes since first reading  
- Parses temperature, humidity, pressure, air quality, CO₂, VOC  

### **Binary Export**
- Packs each record as **seven doubles**  
- Writes sequentially to `output.bin`  
- Produces a compact binary stream for downstream modules  

**Output:**  
A normalized binary file ready for analysis.

---

## 2. Data Analysis  

The analyzer performs three major analyses:

### **Basic Statistics**
- Min, max, mean  
- Descriptive metrics for each sensor channel  

### **Trend Detection**
- Long‑term directional changes  
- Rising/falling/stable classification  

### **Anomaly Detection**
- Threshold‑based and deviation‑based logic  
- Flags unusual or out‑of‑range readings  

**Output:**  
A structured analysis file containing all computed metrics.

---

## 3. Plot Generation  

### **CSV Loading**
- Loads newest CSV  
- Extracts timestamps + sensor values  

### **Data Normalization**
- Converts timestamps into minutes  
- Parses all six sensor channels  

### **Multi‑Channel Plot Rendering**
- Six synchronized subplots  
- Shared time axis  
- Clean, aligned visualization  

### **Timestamped PNG Export**
Saved to: `<PROJECT_ROOT>/03_data/output_data/plots/`
Example filename: `plot_2026-08-01_17-34-52.png`

**Output:**  
A timestamped PNG plot containing six synchronized time‑series graphs.

---

## 4. Summary Output  

The summary consolidates all results into a readable environmental assessment.

### **Summary Statistics**
- Min, max, average  
- ASCII sparklines  

### **Anomaly Results**
- Flags out‑of‑range readings  
- States explicitly if none are found  

### **Trend Overview**
- Direction (rising/falling/stable)  
- Numerical deltas  

### **Environmental Interpretation**
Readable insights about:
- Weather stability  
- Air quality  
- Comfort levels  
- Environmental stress signals  

### **Pipeline Status**
Includes:
- Number of samples  
- Total time range  
- Path to generated plot  
- Confirmation of successful pipeline completion  

**Output:**  
A fully formatted analysis report.

---

# Execution Flow (End‑to‑End)

1. **Sensor Data Ingestion**  
   - CSV → normalized binary (`output.bin`)

2. **Data Analysis**  
   - Binary → statistics, trends, anomalies, interpretation

3. **Plot Generation**  
   - CSV → synchronized PNG plot

4. **Summary Output**  
   - Consolidated human‑readable report

This flow is fully implemented and operational.

---

# Development Progress

### **Host Tool (Days 1–7)**
- CSV parser  
- Trend analysis  
- Anomaly detection  
- CMake + Ninja build system  
- CLI flag parser  
- Unit tests + pipeline tests  
- Performance benchmark  
- ASCII sparklines  
- Color visualization  
- Full integration  
- Host tool **100% complete**

### **Firmware (Days 8–13)**
- Repository structure  
- Sensor API analysis  
- SD logging design  
- Telemetry stress‑testing script  
- Firmware still in progress  
- Hardware not yet available for testing  

### **Firmware finsished (Days 13-26)**
- Finished the firmware
- Edited the host-tool analysis for more accurate readings
- All that is left is some formatting error corrections and assembling the device hardware.

---

# Climate Relevance & Engineering Tradeoffs  

### **Why these sensors?**
- BME680 + CCS811 provide a broad environmental profile  
- VOC + CO2‑equivalent metrics support air‑quality assessment  
- Temperature + humidity + pressure support climate pattern tracking  

### **Why ESP32?**
- Low‑power operation  
- Integrated Wi‑Fi for future cloud upload  
- Mature ecosystem  
- Sufficient RAM/flash for logging + analysis  

### **Why CSV?**
- Human‑readable  
- Easy to debug  
- Compatible with host‑side tooling  
- Simple to convert into binary for fast analysis  

### **Why long‑term monitoring?**
- Detects climate trends  
- Captures daily/seasonal cycles  
- Supports environmental research  
- Enables anomaly detection (heat spikes, VOC surges)

---

# Lessons Learned (So Far)

- Host‑side analysis benefits enormously from modular design  
- CSV → binary conversion dramatically improves performance  
- Trend detection requires careful timestamp normalization  
- Anomaly detection must be robust to sensor noise  
- SD logging reliability is essential for long‑duration monitoring  
- Firmware development is slowed by sensor API complexity  
- Hardware availability is critical for validation  

---

# Future Work

### **Firmware**
- Add smoothing filters  
- Add UART telemetry + CRC framing  
- Add Wi‑Fi `/latest.csv` endpoint  
- Add power budget documentation  

### **Host Tool**
- Already complete  
- Future stretch goals:  
  - Kalman filtering  
  - Cloud upload  
  - Real‑time dashboard  

### **Hardware**
- Wiring diagrams  
- Enclosure  
- Airflow considerations  
- Stress testing  

---

# Source Code
Full project available on GitHub:

`https://github.com/williamkindell460-alt/Climate-Based-Monitoring-Device`
