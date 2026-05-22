export type UserRole = "contributor" | "maintainer";

export type IssueStatus = "open" | "in_progress" | "resolved";

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export type Issue = {
  title: string;
  description: string;
  type: string;
};

export type Status = "open" | "in_progress" | "resolved";
