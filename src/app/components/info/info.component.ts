import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  userName: String;
  companiesCount: number;
  customersCount: number;
  couponsCount: number;
  transactionsCount: number;
  secure = new SecureLS();

  constructor(private infoService: InfoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userName = this.secure.get('nameS');

    this.infoService.getInfo().subscribe(data => {
      console.log(data);
      this.companiesCount = data.companiesCount;
      this.customersCount = data.customersCount;
      this.couponsCount = data.couponsCount;
      this.transactionsCount = data.transCount;
    }, error => console.log(error));
  }



}
