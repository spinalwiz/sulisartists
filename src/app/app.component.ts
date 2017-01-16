import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService} from "./data.service";
import * as _ from "lodash";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errorMessage: string;
  allData: any[];
  artistNames: any[];
  customerNames: any[];
  rows: Observable<any[]>;

  columns = [
    { prop: 'sku' },
    { name: 'artist' },
    { name: 'Value' },
    { name: 'Sku' },
    { name: 'Customer' },
    { name: 'Email' },
    { name: 'Date' },
    { name: 'Status' }
    ];

  @ViewChild('artistSelect') artistSelect;
  @ViewChild('customerSelect') customerSelect;



  mode = 'Observable';

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getData();
    this.rows = this.dataService.getAllData();
  }

  getData(){
    this.dataService.getAllData()
      .subscribe(
        data => this.allData = data,
        error =>  this.errorMessage = <any>error
      );

    this.dataService.getArtistData()
      .subscribe(
        data => {
          this.artistNames = _.map(data, 'artist');
          this.artistSelect.items = _.map(this.artistNames, function(value, index) {
            return {"text": value, "id":index}
          });
        },
        error =>  this.errorMessage = <any>error,
      );

    this.dataService.getCustomerData()
      .subscribe(
        data => {
          this.customerNames = _.map(data, 'customer');
          this.customerSelect.items = _.map(this.customerNames, function(value, index) {
            return {"text": value, "id":index}
          });
        },
        error =>  this.errorMessage = <any>error);
  }
}
