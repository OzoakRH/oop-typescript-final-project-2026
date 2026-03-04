# 🧱 Data Model Documentation — Blog / Content Platform

## 1. Enums
### `PostStatus`
* **DRAFT**: บทความฉบับร่าง (Default)
* **PUBLISHED**: บทความที่เผยแพร่แล้ว
* **ARCHIVED**: บทความที่ถูกเก็บถาวร

## 2. Core Entities

### 📄 Post (บทความ)
| Attribute | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `string` | Primary Key, Unique Identifier |
| `title` | `string` | Min 5 chars, Required |
| `content` | `string` | Required |
| `author` | `string` | Required |
| `status` | `PostStatus` | Enum, Default: `DRAFT` |
| `createdAt` | `Date` | Auto-generated Timestamp |
| `updatedAt` | `Date` | Updated on every modification |

### 💬 Comment (ความคิดเห็น)
| Attribute | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `string` | Primary Key, Unique Identifier |
| `postId` | `string` | Foreign Key (Links to Post.id), Required |
| `author` | `string` | Required |
| `message` | `string` | Required |
| `createdAt` | `Date` | Auto-generated Timestamp |

## 3. Relationships
* **One-to-Many (1:N)**: Post หนึ่งรายการ สามารถมีได้หลาย Comment (สังเกตจาก `postId` ใน Comment)

---

## 4. Sample Data Structure (JSON Persistence)

### Post Example
```json
{
  "id": "1741104000000",
  "title": "เริ่มต้นเรียน NestJS",
  "content": "เนื้อหาการเขียน Backend ด้วย NestJS เบื้องต้น...",
  "author": "Mark Anuwuth",
  "status": "PUBLISHED",
  "createdAt": "2026-03-03T12:00:00Z",
  "updatedAt": "2026-03-03T12:00:00Z"
}

### Comment Example

{
  "id": "101",
  "postId": "1741104000000",
  "author": "Msrkkyyyyy123",
  "message": "บทความนี้มีประโยชน์มากครับ!",
  "createdAt": "2026-03-03T13:00:00Z"
}