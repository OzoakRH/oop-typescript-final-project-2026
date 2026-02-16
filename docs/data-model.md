# 🧱 Data Model Documentation — Blog / Content Platform

## 1. Enums
### `PostStatus`
* **DRAFT**: บทความฉบับร่าง
* **PUBLISHED**: บทความที่เผยแพร่แล้ว
* **ARCHIVED**: บทความที่ถูกเก็บถาวร

## 2. Core Entities
### 📄 Post (บทความ)
| Attribute | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `string` | Primary Key, Required |
| `title` | `string` | Min 5 chars, Required |
| `content` | `string` | Required |
| `author` | `string` | Required |
| `status` | `PostStatus` | Enum, Default: `DRAFT` |
| `createdAt` | `Date` | Auto-generated |

### 💬 Comment (ความคิดเห็น)
| Attribute | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `string` | Primary Key, Required |
| `postId` | `string` | Foreign Key (Links to Post), Required |
| `author` | `string` | Required |
| `message` | `string` | Required |
| `createdAt` | `Date` | Auto-generated |

## 3. Relationships
* **One-to-Many (1:N)**: Post หนึ่งรายการ สามารถมีได้หลาย Comment