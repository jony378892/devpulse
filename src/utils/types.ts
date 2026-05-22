export type UserRole = "contributor" | "maintainer";

export type IssueStatus = "open" | "in_progress" | "resolved";

export type User = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};
