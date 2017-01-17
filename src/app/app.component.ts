import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService} from "./data.service";
import * as _ from "lodash";
import {Observable} from "rxjs";
import {SelectComponent} from "ng2-select";

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
  rowsCopy: Observable<any[]>;


  columns = [
    { prop: 'sku',
      width:50   },
    { name: 'artist',
      width: 500 },
    { prop: 'base_total_paid',
      name: 'Value',
      width: 50 },
    { name: 'Customer' },
    { prop: 'customer_email',
      name: 'Email' },
    { prop: 'created_at',
      name: 'Date' }
  ];

  @ViewChild('artistSelect')
  private myArtistSelect;

  @ViewChild('customerSelect')
  private myCustomerSelect: SelectComponent;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getData();
    this.rows = this.dataService.getAllData();
    this.rowsCopy = this.rows; //to preserve original data

    this.myArtistSelect.onRemoved.subscribe(
      (m) => {
        // debugger;
        this.resetData();
      }
    );

  }

  resetData() {
    console.log("resetting");
    this.rows = this.rowsCopy; // do this better
  }


  updateArtistFilter(input) {
    let subscription = this.rowsCopy.map(
      data => {
        return data.filter(entry => {
          if (entry.artist) {
            return entry.artist.toLowerCase().includes(input.toLowerCase());
          }
        });
      }
    ).subscribe(
      data => this.rows = Observable.of(data)
    );
  }

  updateCustomerFilter(input) {
    let subscription = this.rowsCopy.map(
      data => {
        return data.filter(entry => {
          if (entry.customer) {
            return entry.customer.toLowerCase().includes(input.toLowerCase());
          }
        });
      }
    ).subscribe(
      data => this.rows = Observable.of(data)
    );
  }

  c

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
          this.myArtistSelect.items = _.map(this.artistNames, function(value, index) {
            return {"text": value, "id":index}
          });
        },
        error =>  this.errorMessage = <any>error,
      );

    this.dataService.getCustomerData()
      .subscribe(
        data => {
          this.customerNames = _.map(data, 'customer');
          this.myCustomerSelect.items = _.map(this.customerNames, function(value, index) {
            return {"text": value, "id":index}
          });
        },
        error =>  this.errorMessage = <any>error);
  }
}
