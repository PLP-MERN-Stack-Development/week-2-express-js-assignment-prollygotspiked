# 🛠 Express API Project

## 📦 Overview

This is a RESTful API built with Express.js to manage a list of products. It supports standard CRUD operations, middleware for logging, authentication, validation, and advanced features like filtering, pagination, and search.

---

## 🚀 How to Run the Server

```bash
# Install dependencies
npm install

# Start the server
npm start
The server runs on: http://localhost:3000

Make sure to include your API key in request headers:
x-api-key: 123456

📌 API Endpoints
🔹 GET /api/products
List all products

Optional query parameters:

category=tools → filter by category

page=1 → page number

limit=5 → number of items per page

Example:
GET /api/products?category=tools&page=1&limit=5
🔹 GET /api/products/:id
Get one product by its unique ID

🔹 POST /api/products
Create a new product

JSON Body Example:{
  "name": "Hammer",
  "description": "Heavy duty steel hammer",
  "price": 25.50,
  "category": "tools",
  "inStock": true
}
🔹 PUT /api/products/:id
Update an existing product

Send the updated product info in the same format as POST

🔹 DELETE /api/products/:id
Delete a product by ID

🔹 GET /api/products/search?name=...
Search for products by name

Example:GET /api/products/search?name=hammer
🔹 GET /api/products/stats
Get statistics about products grouped by category

Example Output:{
  "tools": 3,
  "electronics": 5
}
🔐 Required Headers
Every request must include this header:

makefile
Copy
Edit
x-api-key: 123456
If it's missing or incorrect, you'll get a 401 Unauthorized error.

📂 Middleware
Logger – Logs HTTP method, URL, and timestamp

Authentication – Requires a valid API key

Validation – Checks product fields before POST/PUT

⚠️ Error Handling
Custom error classes: NotFoundError, ValidationError

Centralized error handling middleware

Returns proper HTTP status codes and clear messages

🧪 Example curl Request
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: 123456" \
  -d '{
    "name": "Laptop",
    "description": "Gaming laptop",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }'
