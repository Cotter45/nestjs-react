export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  articles?: Article[];
}

export interface Article {
  id: number;
  title: string;
  description: string;
  body: string;
  authorId: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
}
