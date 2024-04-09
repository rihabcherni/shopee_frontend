import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-failed-alert',
  templateUrl: './failed-alert.component.html',
  styleUrls: ['./failed-alert.component.scss'],
})
export class FailedAlertComponent  implements OnInit {
  @Input() message: string | undefined;

  constructor() { }

  ngOnInit() {}

}
