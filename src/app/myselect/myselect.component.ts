import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'myselect',
  templateUrl: './myselect.component.html',
  styleUrls: ['./myselect.component.css']
})
export class MyselectComponent implements OnInit {
  items:Array<any>;

  constructor() { }

  ngOnInit() {
  }



  private value:any = {};

  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

}
