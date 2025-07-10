# 📧 Resilient Email Service (JavaScript)

This project implements a **resilient email sending service** using Node.js. It simulates real-world behaviors such as provider failure, retries, fallback, idempotency, rate limiting, logging, and more — making it ideal for production-grade architecture design.

---

## 🔧 Features

✅ Retry mechanism with exponential backoff  
✅ Fallback between multiple mock providers  
✅ Idempotency (prevent duplicate sends)  
✅ Basic rate limiting (5 requests per minute)  
✅ Status tracking for email attempts  
✅ Logging system with timestamps  
✅ Mock providers with configurable reliability   
✅ Simple logger system (`logs.txt`)  
✅ Configurable provider failure rates  

---
## 🧰 Tech Stack

- **Node.js**
- **JavaScript (ES6)**
- **Native fs, path for file ops**
- **No external email libraries**
---
## 📁 Project Structure
```
resilient-email-service/
│
├── src/
│ ├── EmailService.js # Core email service with all logic
│ ├── providers/
│ │ ├── ProviderA.js # Mock provider A (80% success)
│ │ └── ProviderB.js # Mock provider B (50% success)
│ └── utils/
│ └── logger.js # Centralized logging utility
|
├── tests/
│   └── EmailService.test.js # Unit tests
│
├── logs/ # Auto-generated logs.txt
├── index.js # Main entry (API/server)
├── package.json
└── README.md

```
---

## 🚀 How to Run Locally

### 1. Clone the Repository
```
git clone https://github.com/OMENDRA1604/resilient-email-service.git
cd resilient-email-service
```
### 2. Install Dependencies

```
npm install
```

### 3. Start the Server
```
node index.js
```

Server will start on http://localhost:8000

---

## 📮 API Endpoint

### POST `/send`  
Send an email request.

---

### 🔸 Request Body (JSON):

```json
{
  "id": "email-123",
  "email": "user@example.com",
  "subject": "Hello!",
  "body": "This is a test email"
}
```

### 🔸 Example using Postman or curl:
```
curl -X POST http://localhost:3000/send \
  -H "Content-Type: application/json" \
  -d '{"id":"abc123","email":"test@example.com","subject":"Hi","body":"Hello from JS!"}'
```
### 🔸 Sample Response:
```
"Email sent successfully"
```

---

## 📝 Logging

Logs are saved automatically to logs/logs.txt in this format:

```text
[2025-07-10T09:32:11.889Z] [INFO]: Trying ProviderA for ID abc123
```
You can configure the logger to use local time if needed.

---

## 🧪 Testing

You can test:

🔁 **Retry**: Set provider success rate low (e.g., 0.2)

🔄 **Fallback**: Make ProviderA fail more often than ProviderB

🚫 **Rate limit**: Try sending 6+ emails within a minute

🔐 **Idempotency**: Reuse the same id multiple times

---

## 🧠 Assumptions

- The service does not use real email APIs, only mocks.
- Rate limit is 5 emails per minute globally.
- Duplicate ids are considered already sent.
- Provider success rates are passed via constructor.

---

## 🙋‍♂️ Author & Contact

👤 **Omendra Singh**  
🔗 [LinkedIn](https://www.linkedin.com/in/omendra-singh-50b790291)  
💻 [GitHub](https://github.com/OMENDRA1604)  
✉️ omendrasingh1604@gmail.com
