export interface SingUpData {
  name: string;
  password: string;
  email: string;
  username: string;
}

export interface SingInData {
  username?: string;
  email?: string;
  password: string;
}

export interface PostData {
  content: string;
  parentId?: string;
  images?: File[];
}

export interface Post {
  id: string;
  content: string;
  commentPostReference?: string;
  images?: string[];
  createdAt: Date;
  authorId: string;
  author: Author;
  reactions: Reaction[];
  comments: Post[];
  qtyComments: number;
  qtyLikes: number;
  qtyRetweets: number;
}

export interface Reaction {
  id: string;
  reactionType: string;
  createdAt: Date;
  userId: string;
  postId: string;
  updatedAt: Date;
  deletedAt?: Date;
}
export interface Author {
  id: string;
  name?: string;
  username: string;
  profilePicture?: string;
  private: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name?: string;
  username: string;
  profilePicture?: string;
  private: boolean;
  createdAt: Date;
  followers: Author[];
  following: Author[];
  posts: Post[];
}

export interface MessageDTO {
  id: string;
  senderId: string;
  chatId: string;
  content: string;
  date: Date;
}

export interface ChatDTO {
  id: string;
  name: string;
  users: Author[];
  messages: MessageDTO[];
}
