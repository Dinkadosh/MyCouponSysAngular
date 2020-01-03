import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';

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

  constructor(private infoService: InfoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('name');

    this.infoService.getInfo().subscribe(data => {
      console.log(data);
      this.companiesCount = data.companiesCount;
      this.customersCount = data.customersCount;
      this.couponsCount = data.couponsCount;
      this.transactionsCount = data.transCount;
    }, error => console.log(error));
  }



}
