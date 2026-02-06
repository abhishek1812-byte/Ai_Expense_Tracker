# AI Expense Tracker

An AI-powered expense tracking backend that converts natural language input into structured expense data automatically using **Hugging Face models**.

This project focuses on **AI-assisted parsing**, **robust backend design**, and **real-world failure handling**.

---

## 👤 Author

- **Name:** Abhishek  
- **GitHub:**https://github.com/abhishek1812-byte


---

## 🎥 Demo

- Backend tested using **Postman** and **curl**
- API responses demonstrated for expense creation, listing, and deletion

## Demo

Watch the screen recording here:  
https://screenrec.com/share/Gz6br5hdtD

---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **Express**
- **TypeScript**
- **SQLite** (better-sqlite3)

### AI Parsing
- **Hugging Face Inference API**
- Large Language Model used to extract structured data from natural language

---

## 🚀 Features

- Add expenses using **plain English**
  - Example: `"Spent 850 on lunch at Taj"`
- Automatic extraction of:
  - Amount
  - Currency
  - Category
  - Description
  - Merchant (if available)
- Supported categories:
  - Food & Dining
  - Transport
  - Shopping
  - Entertainment
  - Bills & Utilities
  - Health
  - Travel
  - Other
- SQLite database auto-created on server start
- REST APIs ready for any frontend (mobile or web)
- Defensive AI parsing with validation and fallback handling

---

## 🤖 AI Parsing Design (Hugging Face)

The backend uses a **Hugging Face hosted language model** to parse user-provided natural language expense descriptions.

### Parsing Strategy

1. User submits free-form text
2. Text is sent to a Hugging Face inference endpoint
3. Model response is parsed and validated
4. Required fields are enforced
5. Defaults are applied where necessary
6. Invalid or malformed responses are safely rejected

### Design Principles

- AI output is **never trusted blindly**
- JSON is extracted defensively
- Missing fields are handled gracefully
- Backend never crashes due to AI failure

---

## 📡 API Endpoints

### Health Check
