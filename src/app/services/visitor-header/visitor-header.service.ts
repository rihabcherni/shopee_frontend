import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisitorHeaderService {
  pageTitle!: string;
  subpageTitle!: string;
  imageSource!: string;
  constructor() { }

}
