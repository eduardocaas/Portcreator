import { Column, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Certification } from "./Certification";

export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false
  })
  name: string;
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  email: string;
  @Column({
    type: 'varchar',
    nullable: false
  })
  password: string;
  @Column({
    type: 'varchar',
    nullable: true
  })
  location?: string;
  @Column({
    type: 'text',
    nullable: true
  })
  description?: string;
  @Column({
    type: 'text',
    nullable: true
  })
  goal?: string;
  @Column({
    type: 'varchar',
    nullable: true
  })
  github?: string;
  @Column({
    type: 'varchar',
    nullable: true
  })
  linkedin?: string;
  @Column({
    type: 'varchar',
    nullable: true
  })
  imagePath?: string;
  @Column({
    type: 'boolean',
    nullable: false
  })
  isActive: boolean;
  @Column({
    type: 'boolean',
    nullable: false
  })
  firstUpdate: boolean;
  @OneToMany(() => Certification, (certification) => certification.user)
  certifications?: Certification[];

  constructor(
    name: string,
    email: string,
    password: string
  ) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
    this.isActive = true;
    this.firstUpdate = true;
  }
  
  update(
    name: string,
    email: string,
    location: string,
    description: string,
    goal: string,
    github: string,
    linkedin: string) {
    this.name = name;
    this.email = email;
    this.location = location;
    this.description = description;
    this.goal = goal;
    this.github = github;
    this.linkedin = linkedin;
    this.firstUpdate = false;
  }

  updatePassword(password: string) { this.password = password }
  updateImage(imagePath: string) { this.imagePath = imagePath }
}