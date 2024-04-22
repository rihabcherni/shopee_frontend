import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent  implements OnInit {
  @Input() maxRating: number = 5;
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  icons: string[] = [];
  totalWidth: number = 0;

  ngOnInit() {
    this.calculateIcons();
  }

  calculateIcons() {
    this.icons = [];
    const integerPart = Math.floor(this.rating);
    const decimalPart = this.rating - integerPart;
    for (let i = 0; i < this.maxRating; i++) {
      if (i < integerPart) {
        this.icons.push('star');
      } else if (i === integerPart && decimalPart > 0) {
        this.icons.push('star-half');
      } else {
        this.icons.push('star-outline');
      }
    }
    this.totalWidth = this.maxRating * 36;
  }

  setRating(event: MouseEvent) {
    const starWidth = 36;
    const boundingRect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left;
    const rating = offsetX / starWidth;
    this.rating = rating > this.maxRating ? this.maxRating : rating;
    this.calculateIcons();
    this.ratingChange.emit(this.rating);
  }
}
