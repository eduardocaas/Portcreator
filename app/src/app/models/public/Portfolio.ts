import { Certification } from "../admin/Certification";
import { User } from "../admin/UserUpdate";
import { PortfolioPOJO } from "./PortfolioPOJO";

export type PortfolioFieldsOnly = {
  [K in keyof Portfolio as Portfolio[K] extends Function ? never : K]: Portfolio[K];
};

export class Portfolio {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  location?: string | null;
  description?: string | null;
  goal?: string | null;
  github?: string | null;
  linkedin?: string | null;
  imagePath?: string | null;
  certifications?: Certification[] | null;
  status?: boolean | null;

  constructor();
  constructor(
    id: string,
    name: string,
    email: string,
    location: string,
    description: string,
    goal: string,
    github: string,
    linkedin: string,
    imagePath: string,
    certifications: Certification[],
    status: boolean)
  constructor(
    id?: string,
    name?: string,
    email?: string,
    location?: string,
    description?: string,
    goal?: string,
    github?: string,
    linkedin?: string,
    imagePath?: string,
    certifications?: Certification[],
    status?: boolean
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.location = location;
    this.description = description;
    this.goal = goal;
    this.github = github;
    this.linkedin = linkedin;
    this.imagePath = imagePath;
    this.certifications = [];
    this.status = false;
  }

  setUser(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.location = user.location;
    this.description = user.description;
    this.goal = user.goal;
    this.github = user.github;
    this.linkedin = user.linkedin;
    this.imagePath = user.imagePath;
  }

  setCertifications(certifications: Certification[]) {
    this.certifications = certifications;
  }

  clone(): Portfolio {
    return new Portfolio(
      this.id!,
      this.name!,
      this.email!,
      this.location!,
      this.description!,
      this.goal!,
      this.github!,
      this.linkedin!,
      this.imagePath!,
      this.certifications!,
      this.status!
    )
  }

  get<K extends keyof Portfolio>(property: K): Portfolio[K] {
    return this[property];
  }

  setNull<K extends keyof PortfolioFieldsOnly>(property: K) {
    this[property] = null;
  }

  toPOJO(): PortfolioPOJO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      location: this.location,
      description: this.description,
      goal: this.goal,
      github: this.github,
      linkedin: this.linkedin,
      imagePath: this.imagePath,
      status: this.status,
      certifications: this.certifications
    }
  }
}
