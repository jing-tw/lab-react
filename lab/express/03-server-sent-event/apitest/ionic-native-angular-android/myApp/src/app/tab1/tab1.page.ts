import { Component } from '@angular/core';

import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public myserviceService:MyServiceService) {
    console.log("Tab1Page constructor");
  }

  // constructor(public myserviceService:MyServiceService) {
  //   console.log("Tab1Page constructor");
  // }
  
  public callMyService(){
    // debugger;
    this.myserviceService.callMyService();

    const urlEndPoint = 'https://notify-api.line.me/api/notify';
    const strToken = 'eBTHTlHvJJXX8Bc6WsQ8XPs05j75Vbz4rj7FNgrivVj';
    this.myserviceService.sendLineMessage(urlEndPoint, 'Test from Ionic', strToken);
  }

  public sendLineImage(){
    // debugger;
    this.myserviceService.callMyService();

    const urlEndPoint = 'https://notify-api.line.me/api/notify';
    const strToken = 'eBTHTlHvJJXX8Bc6WsQ8XPs05j75Vbz4rj7FNgrivVj';
    this.myserviceService.sendLineImage(urlEndPoint, 'Test from Ionic', strToken);
  }

}
