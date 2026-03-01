export interface IComment {
  id: string;
  postId: string; // ใช้เชื่อมกับ ID ของบทความ
  author: string;
  message: string;
  createdAt: Date;
}