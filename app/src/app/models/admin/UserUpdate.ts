export interface User {
  id: string | null,
  name: string,
  email: string | null,
  location?: string,
  description?: string,
  goal?: string,
  github?: string,
  linkedin?: string
}
