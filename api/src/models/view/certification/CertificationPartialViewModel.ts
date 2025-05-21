export class CertificationPartialViewModel {
  id: string;
  title: string;
  hours: number;

  constructor(id: string, title: string, hours: number) {
    this.id = id;
    this.title = title;
    this.hours = hours;
  }
}