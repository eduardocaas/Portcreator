import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { CertificationType } from "./enums/CertificationType";

@Entity()
export class Certification extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;
  @Column({ type: 'text', nullable: false })
  description: string;
  @Column({
    type: 'enum',
    enum: CertificationType,
    nullable: false
  })
  type: CertificationType;
  @Column({
    nullable: false
  })
  issueDate: Date;
  @Column({
    type: 'smallint',
    nullable: false
  })
  hours: number;
  @Column({
    type: 'varchar',
    nullable: false
  })
  institutionName: string;
  @Column({
    type: 'varchar',
    nullable: true
  })
  imagePath?: string;

  constructor(
    title: string,
    description: string,
    type: CertificationType,
    issueDate: Date,
    hours: number,
    institutionName: string
  ) {
    super();
    this.title = title;
    this.description = description;
    this.type = type;
    this.issueDate = issueDate;
    this.hours = hours;
    this.institutionName = institutionName;
  }

  updateImage(imagePath: string) { this.imagePath = imagePath; }
}