# Lawyer Case Management API

> A scalable backend built with **Node.js, Express, TypeScript, and MySQL**.

---

## ✨ Tech Stack

- Node.js  
- Express.js  
- TypeScript  
- MySQL  
- dotenv  
- JWT, bcrypt  
- express-validator / zod

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/engrmzubair/lawyer-case-api
   cd lawyer-case-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env`)
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=lawyer_case_db
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the project**
   ```bash
   npm run dev
   ```

---

## 📁 Folder Structure

```
/src
├── config/
│   ├── db.ts
│   ├── env.ts
│   └── index.ts
├── controllers/
│   ├── AuthController.ts
│   ├── CaseController.ts
│   └── index.ts
├── services/
│   ├── AuthService.ts
│   ├── CaseService.ts
│   └── index.ts
├── repositories/
│   ├── UserRepository.ts
│   ├── CaseRepository.ts
│   └── index.ts
├── models/
│   ├── UserModel.ts
│   ├── CaseModel.ts
│   └── index.ts
├── routes/
│   ├── auth.routes.ts
│   ├── case.routes.ts
│   └── index.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   ├── validate.middleware.ts
│   ├── logger.middleware.ts
│   └── index.ts
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   ├── validators.ts
│   └── index.ts
├── types/
│   ├── auth.d.ts
│   ├── case.d.ts
│   └── index.ts
├── app.ts
├── server.ts
└── index.ts
```

---

## 📜 Scripts

- `npm run dev` → Run in development mode  
- `npm run build` → Build TypeScript  
- `npm start` → Start production server

---

## ✅ Example Endpoints

- `POST /api/auth/signup` → Register lawyer  
- `POST /api/auth/signin` → Login  
- `POST /api/case` → Create case

