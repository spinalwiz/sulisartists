import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService} from "./data.service";
import * as _ from "lodash";
import {Observable, ObjectUnsubscribedError} from "rxjs";

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
    { prop: 'sku' },
    {
      name: 'artist',
      width: 500
    },
    { name: 'Value' },
    { name: 'Customer' },
    { name: 'Email' },
    { name: 'Date' },
    { name: 'Status' }
  ];

  @ViewChild('artistSelect') artistSelect;
  @ViewChild('customerSelect') customerSelect;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getData();
    this.rows = this.dataService.getAllData();
    this.rowsCopy = this.rows; //to preserve original data
  }

  updateArtistFilter(input) {
    console.log("parent search input ", input);
    let val = input.toLowerCase();

    let newData = [];


    let subscription = this.rowsCopy.subscribe(
      data => {
        newData = data;
      },
      err => console.log(err),
      () => {
        newData = newData
          .filter(entry => {
              if (entry.artist) {
                return entry.artist.toLowerCase().includes(val);
              }
            });
        console.log(newData);
        this.rows = Observable.of(newData);
      }
    );

    // let subscription = this.rowsCopy.map(
    //   data => {
    //     newData = data.filter(entry => {
    //       if (entry.artist) {
    //         return entry.artist.toLowerCase().includes(val);
    //       }
    //     });
    //     console.log(newData);
    //     this.rows = Observable.of(newData);
    //   }
    // );

    subscription.unsubscribe();
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
