# 🚀 Blog / Content Platform API — Final Project 2026
ระบบ API สำหรับจัดการเนื้อหาบทความและความคิดเห็น พัฒนาด้วย NestJS และ TypeScript โดยเน้นการออกแบบตามหลัก Object-Oriented Programming (OOP) และการจัดการข้อมูลแบบ Type-safe

## 📌 Project Overview
โปรเจคนี้คือระบบ Backend สำหรับ Blog Platform ที่รองรับการจัดการเนื้อหา (Content Management) และการโต้ตอบผ่านความคิดเห็น (User Interaction) โดยออกแบบภายใต้แนวคิด **Object-Oriented Programming (OOP)** และมาตรฐาน **RESTful API**

---

## 🧩 Model Set Selection (การเลือกโมเดล)
การเลือกหัวข้อโครงงานอ้างอิงจากผลรวมรหัสนักศึกษาตามเกณฑ์ที่กำหนด:
* **Sum Student ID:** `272043701`
* **Selection Logic:** `272043701 mod 10 = 1`
* **Model Set ID:** `1` (Blog / Content Platform)
* **Core Models:** `Post` (บทความ) และ `Comment` (ความคิดเห็น)

---

## 📄 Documentation (ลิงก์เอกสารประกอบ)
รายละเอียดเชิงลึกของระบบสามารถศึกษาได้จากเอกสารในโฟลเดอร์ `docs/`:
* 🧱 **[Data Model Documentation](docs/data-model.md)**: รายละเอียดโครงสร้าง Table, Enum และความสัมพันธ์ 1:N
* 🔌 **[API Specification](docs/api-specification.md)**: รายละเอียด Endpoint ทั้งหมด, Request Body และ Response Format
* 📊 **[UML Diagram](docs/uml-diagram.png)**: แผนผังความสัมพันธ์ (Entity Relationship Diagram)

---

## 🛠 Technology Stack (เครื่องมือที่ใช้พัฒนา)
เพื่อให้ระบบมีประสิทธิภาพและดูแลรักษาง่าย เราเลือกใช้เทคโนโลยีดังนี้:
* **Framework:** `NestJS v10+` (Modular Architecture)
* **Language:** `TypeScript 5+` (Strict Mode - **Strictly No `any` type**)
* **Data Storage:** `In-memory Array` (จัดการข้อมูลผ่าน Service Logic พร้อมรองรับการขยายเป็น Database ในอนาคต)
* **API Documentation:** `Swagger (OpenAPI 3.0)`
* **Validation:** `class-validator` & `class-transformer` สำหรับตรวจสอบความถูกต้องของข้อมูล (Data Integrity)

---

## 📂 Project Structure (การจัดวางโครงสร้าง)
โปรเจคถูกแบ่งออกเป็น Module ตามหลักการของ NestJS เพื่อความเป็นระเบียบ:
```text

src/
├── common/
│   └── interfaces/
│       └── api-response.interface.ts   # มาตรฐาน Response Format
├── modules/
│   ├── posts/                          # --- Module จัดการบทความ ---
│   │   ├── dto/
│   │   │   └── create-post.dto.ts      # โครงสร้างรับข้อมูลสร้างโพสต์
│   │   ├── enums/
│   │   │   └── post-status.enum.ts     # กำหนดสถานะ DRAFT, PUBLISHED
│   │   ├── interfaces/
│   │   │   └── post.interface.ts       # กำหนด Schema ของ Post
│   │   ├── posts.controller.ts         # จัดการ Route /posts
│   │   ├── posts.module.ts             # รวบรวมองค์ประกอบของ Post
│   │   └── posts.service.ts            # Business Logic ของบทความ
│   └── comments/                       # --- Module จัดการความคิดเห็น ---
│       ├── dto/
│       │   └── create-comment.dto.ts   # โครงสร้างรับข้อมูลคอมเมนต์
│       ├── interfaces/
│       │   └── comment.interface.ts    # กำหนด Schema ของ Comment
│       ├── comments.controller.ts      # จัดการ Route /comments
│       ├── comments.module.ts          # รวบรวมองค์ประกอบของ Comment
│       └── comments.service.ts         # Logic การผูกคอมเมนต์กับ postId
├── app.module.ts                       # Module หลักที่รวมทุก Module เข้าด้วยกัน
├── app.spec.ts                         # ไฟล์สำหรับ Unit Testing ระบบเบื้องต้น
└── main.ts                             # จุดเริ่มต้นระบบ (Bootstrap & Swagger Config)
```

## 🚀 Getting Started (วิธีการใช้งาน)

### 1. การติดตั้ง (Installation)
```bash
# ติดตั้ง dependencies ทั้งหมด
npm install

### การทดสอบระบบ (Testing)
รัน Unit Test เพื่อตรวจสอบความถูกต้องของ Logic:
```bash
# Unit Testing
npm run test

# End-to-End (e2e) Testing
npm run test:e2e
```

## ⚠️ Error Handling Logic & Standard Response 
ระบบมีการจัดการข้อผิดพลาดตามมาตรฐาน NestJS Exception Filters:
* **400 Bad Request:** เมื่อข้อมูลที่ส่งมาไม่ผ่าน Validation (เช่น ลืมใส่ Title)
* **404 Not Found:** เมื่อพยายามดึงข้อมูล Post หรือ Comment ที่ไม่มีอยู่ในระบบ
* **Standard Response:** ทุก Error จะถูกส่งกลับในรูปแบบ `ApiResponse` ที่มี `success: false` เสมอ

Success Response:
```Json
{
  "success": true,
  "message": "ข้อความอธิบายผลลัพธ์",
  "data": { ... } // ข้อมูลจริง (Strictly Typed)
}
```

## 👥 Contributors (สมาชิกในกลุ่ม)
รหัสนักศึกษา 68011136: นาย Sirapop Jaroenkun (GitHub: @OzoakRH) - Team Leader

รหัสนักศึกษา 68011101: นาย  Supalerk Pleanpan (GitHub: @68011101-supalerk)

รหัสนักศึกษา 68011223: นาย Anuwuth Chotampaikorn (GitHub: @Msrkyyyyy123)

รหัสนักศึกษา 68010241: นาย Channarong Nakkhantong (GitHub: @Channarong)