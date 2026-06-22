# Bidirectional Rich Text Sync Across Iframes

---

This repository contains a real-time rich text synchronization system built using React and the browser postMessage API. The application demonstrates seamless communication between isolated iframe contexts, allowing formatting and content updates to be synchronized instantly across multiple editors.

## Project Overview

---

Iframes operate within isolated browsing contexts and cannot directly access each other's DOM. This project solves that limitation by implementing a host-page message broker architecture using the window.postMessage API.

The host page receives editor updates from one iframe and relays them to the other, enabling bidirectional synchronization while preventing infinite message loops.

## Key Features

---

### Real-Time Rich Text Synchronization

Formatting changes made in one editor are immediately reflected in the second editor.

### Rich Text Formatting

Supports:

* Bold
* Italic
* Strikethrough

### Bidirectional Communication

Both iframe editors can initiate updates independently.

### Host Page Message Broker

The parent application listens for messages and securely relays updates between isolated iframe contexts.

### Infinite Loop Prevention

Remote updates are identified and prevented from being rebroadcast, avoiding recursive synchronization loops.

### Origin Validation

Incoming messages are validated before processing to ensure secure cross-frame communication.

### Toolbar State Synchronization

Toolbar buttons automatically reflect the formatting state at the current cursor position.

### Sync Status Indicator

Visual feedback is displayed whenever synchronization events occur.

### Action Logging

The host page maintains a live log of synchronization events, helping visualize message flow between frames.

## Technology Stack

---

### Frontend

* React
* JavaScript
* HTML5
* CSS3

### Browser APIs

* window.postMessage
* contentEditable
* DOM Events

## Getting Started

---

### Prerequisites

* Node.js 18+
* npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd educhunks-assessment
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Engineering Highlights

---

* Cross-frame communication architecture
* Real-time synchronization workflow
* Event-driven message handling
* Secure message validation
* Infinite loop prevention strategy
* Rich text editor integration
* Lightweight implementation without external editor libraries

## Future Improvements

---

* Cursor position preservation
* Shared undo/redo synchronization
* Multi-user collaborative editing
* Persistent synchronization history

## Author

---

**Jeevan**

Submitted as part of the EduChunks Engineering Intern Assessment.
