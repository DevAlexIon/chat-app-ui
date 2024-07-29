export type Friend = {
  _id: string;
  avatar: string;
  username: string;
};

export type FriendRequest = {
  createdAt: string;
  recipientId?: {
    avatar: string;
    email: string;
    username: string;
    _id: string;
  };
  status: string;
  updatedAt: string;
  _id: string;
};
