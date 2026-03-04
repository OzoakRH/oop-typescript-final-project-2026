# 🔌 API Specification — Blog / Content Platform

เอกสารฉบับนี้ระบุรายละเอียดของ Endpoint ทั้งหมดในระบบจัดการบทความและความคิดเห็น โดยทุก Request และ Response จะเป็นไปตามมาตรฐานที่กำหนดไว้ในรายวิชา (Strictly No any)

## 1. ข้อมูลทั่วไป (General Information)

* **Base URL:** `http://localhost:3000`
* **Content-Type:** `application/json`
* **Standard Response Format:** ทุก API จะส่งข้อมูลกลับมาในรูปแบบเดียวกันดังนี้:

```typescript
interface ApiResponse<T> {
  success: boolean;   // สถานะความสำเร็จ (true/false)
  message: string;    // ข้อความอธิบายผลลัพธ์
  data: T | null;     // ข้อมูลที่ส่งกลับ (ใช้ Narrow Type ห้ามใช้ any)
}
```

## 2. Post Endpoints (การจัดการบทความ)
| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/posts` | ดึงบทความทั้งหมดในระบบ | 200 OK |
| **GET** | `/posts/{id}` | ดึงบทความตาม ID | 200 / 404 |
| **POST** | `/posts` | สร้างบทความใหม่ | 201 / 400 |
| **PUT** | `/posts/{id}` | อัปเดตข้อมูลบทความทั้งหมด | 200 / 404 |
| **PATCH** | `/posts/{id}` | อัปเดตบทความ (บางส่วน) | 200 / 404 |
| **DELETE** | `/posts/{id}` | ลบบทความ | 200 / 404 |

# 📝 ตัวอย่าง: การสร้างบทความ (POST /posts)
Request Body: 
```Json
{
  "title": "เริ่มต้นเรียน NestJS",
  "content": "เนื้อหาการเขียน Backend ด้วย NestJS เบื้องต้น... (string)",
  "author": "Mark Anuwuth (string)",
  "status": "DRAFT"
}
```

Success Response (201 Created):
```Json
{
  "success": true,
  "message": "สร้างบทความสำเร็จ",
  "data": {
    "id": "1741132800000",
    "status": "DRAFT",
    "title": "เริ่มต้นเรียน NestJS",
    "content": "เนื้อหาการเขียน Backend ด้วย NestJS เบื้องต้น... (string)",
    "author": "Mark Anuwuth (string)",
    "createdAt": "2026-03-05T08:00:00.000Z",
    "updatedAt": "2026-03-05T08:00:00.000Z"
  }
}
```

## 3. Comment Endpoints (ความคิดเห็น)
| Method | Endpoint | Description | Status Code |
|--------|----------|------------|-------------|
| GET | `/comments/postId={id}` | ดึงคอมเมนต์ทั้งหมดของโพสต์นั้น | 200 OK |
| POST | `/comments` | สร้างความคิดเห็นใหม่ให้โพสต์ | 201 / 400 |
| DELETE | `/comments/{id}` | ลบคอมเมนต์ตาม ID | 200 / 404 |

# 📝 ตัวอย่าง: การสร้างคอมเมนต์ (POST /comments)
Request Body:
```Json
{
  "postId": "1741132800000",
  "author": "Msrkkyyyyy123",
  "message": "บทความนี้มีประโยชน์มากครับ!"
}
```

## 4. Error Handling
* **400 Bad Request**: ข้อมูลไม่ผ่านการ Validate
* **404 Not Found**: ไม่พบ Resource ที่ระบุในระบบ
* **500 Internal Server Error**: เกิดข้อผิดพลาดภายในระบบ