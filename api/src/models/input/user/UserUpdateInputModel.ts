export class UserUpdateInputModel {
  id: string;
  name: string;
  email: string;
  location?: string;
  description?: string;
  goal?: string;
  github?: string;
  linkedin?: string;
  imagePath?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    location?: string,
    description?: string,
    goal?: string,
    github?: string,
    linkedin?: string,
    imagePath?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.location = location;
    this.description = description;
    this.goal = goal;
    this.github = github;
    this.linkedin = linkedin;
    this.imagePath = imagePath;
  }
}