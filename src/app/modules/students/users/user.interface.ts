export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'user' | 'faculty';
  status: string;
  isDeleted: boolean;
};
