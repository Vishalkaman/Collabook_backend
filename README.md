# Collabook_backend

## 🚀 Run the Server with Nodemon

### 📦 Prerequisites

- Make sure you have **Node.js** and **npm** installed.
- Install dependencies:

```bash
npm install
```

- Install `nodemon` (if not already installed):

```bash
npm install nodemon
```

### 🛠️ Development Server (with Auto Reload)

You can run the server using `nodemon`, which automatically restarts the server on file changes.

```bash
npx nodemon index.js
```

### 📄 Optional: Add Script to `package.json`

To simplify usage, add this to the `scripts` section:

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

Then run:

```bash
npm run dev
```