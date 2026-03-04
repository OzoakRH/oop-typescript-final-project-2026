# 🔌 API Specification — Blog / Content Platform

เอกสารฉบับนี้ระบุรายละเอียดของ Endpoint ทั้งหมดในระบบจัดการบทความและความคิดเห็น โดยทุก Request และ Response จะเป็นไปตามมาตรฐานที่กำหนดไว้ในรายวิชา

## 1. ข้อมูลทั่วไป (General Information)

* **Base URL:** `http://localhost:3000`
* **Content-Type:** `application/json`
* **Standard Response Format:** ทุก API จะส่งข้อมูลกลับมาในรูปแบบเดียวกันดังนี้:

```typescript
interface ApiResponse<T> {
  success: boolean;   // สถานะความสำเร็จ (true/false)
  message: string;   // ข้อความอธิบายผลลัพธ์
  data: T | null;    // ข้อมูลที่ส่งกลับ (ห้ามใช้ any)
}
```


## 2. Post Endpoints (บทความ)
| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/posts` | ดึงบทความทั้งหมด | 200 |
| **GET** | `/posts/{id}` | ดึงบทความตาม ID | 200 / 404 |
| **POST** | `/posts` | สร้างบทความใหม่ | 201 / 400 |
| **PUT** | `/posts/{id}` | อัปเดตบทความ (ทั้งหมด) | 200 / 404 |
| **PATCH** | `/posts/{id}` | อัปเดตบทความ (บางส่วน) | 200 / 404 |
| **DELETE** | `/posts/{id}` | ลบบทความ | 200 / 404 |

## 3. Comment Endpoints (ความคิดเห็น)
| Method | Endpoint | Description | Status Code |
|--------|----------|------------|-------------|
| GET | `/posts/{postId}/comments` | ดึงคอมเมนต์ทั้งหมดของโพสต์ | 200 |
| POST | `/posts/{postId}/comments` | สร้างคอมเมนต์ให้โพสต์ | 201 / 400 |
| DELETE | `/comments/{id}` | ลบคอมเมนต์ตาม ID | 200 / 404 |

## 4. Error Handling
* **400 Bad Request**: ข้อมูลไม่ผ่านการ Validate
* **404 Not Found**: ไม่พบ ID ที่ระบุในระบบ