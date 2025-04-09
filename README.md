# Backend-Crypto-C2C
## วิธีติดตั้งและรันโปรเจกต์

```bash
npm install
npx sequelize db:migrate
node seeders/seed.js
npm run dev
```

## Routes ที่มี

### Orders
- `POST /api/orders/create` – สร้างคำสั่งซื้อ/ขาย
- `POST /api/orders/match` – จับคู่ซื้อขาย
- `GET /api/orders` – ดูออเดอร์ทั้งหมด
- `GET /api/orders/user/:id` – ดูออเดอร์ของผู้ใช้

### Wallet
- `GET /api/wallet/:userId` – ดูกระเป๋าเหรียญของผู้ใช้

### Transactions
- `POST /api/transactions/transfer` – โอนเหรียญให้ผู้ใช้อื่น

## คำอธิบาย
โปรเจกต์นี้สร้างด้วย Node.js และ Sequelize โดยใช้ SQLite เป็นฐานข้อมูลในเครื่อง
สามารถจำลองระบบซื้อขายเหรียญแบบ P2P ได้