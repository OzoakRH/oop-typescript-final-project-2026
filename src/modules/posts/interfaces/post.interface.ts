import { PostStatus } from '../enums/post-status.enum';

export interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
}