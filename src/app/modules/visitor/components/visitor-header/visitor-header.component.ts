import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { VisitorHeaderService } from 'src/app/services/visitor-header/visitor-header.service';

@Component({
  selector: 'app-visitor-header',
  templateUrl: './visitor-header.component.html',
  styleUrls: ['./visitor-header.component.scss'],
})
export class VisitorHeaderComponent  implements OnInit {
  pageTitle: string;
  subpageTitle!: string;
  imageSource: string;

  constructor(private visitorHeaderService: VisitorHeaderService,private navCtrl: NavController) {
    this.pageTitle = this.visitorHeaderService.pageTitle;
    this.subpageTitle = this.visitorHeaderService.subpageTitle;
    this.imageSource = this.visitorHeaderService.imageSource;
  }
  ngOnInit() {}
  goBackToLatestPage() {
    this.navCtrl.back();
  }
}
