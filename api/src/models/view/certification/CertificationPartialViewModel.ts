export class CertificationPartialViewModel {
  id: string;
  title: string;
  hours: number;
  imagePath?: string;

  constructor(id: string, title: string, hours: number, imagePath?: string) {
    this.id = id;
    this.title = title;
    this.hours = hours;
    this.imagePath = imagePath;
  }
}