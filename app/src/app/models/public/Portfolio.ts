import { Certification } from "../admin/Certification";
import { User } from "../admin/UserUpdate";

export class Portfolio {
  id?: string | null;
  name?: string;
  email?: string | null;
  location?: string;
  description?: string;
  goal?: string;
  github?: string;
  linkedin?: string;
  certifications?: Certification[];

  setUser(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.location = user.location;
    this.description = user.description;
    this.goal = user.goal;
    this.github = user.github;
    this.linkedin = user.linkedin;
  }

  setCertifications(certifications: Certification[]) {
    this.certifications = certifications;
  }
}
