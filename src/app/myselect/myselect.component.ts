import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'myselect',
  templateUrl: './myselect.component.html',
  styleUrls: ['./myselect.component.css']
})
export class MyselectComponent implements OnInit {
  items:Array<any>;

  @Output() onTyped = new EventEmitter<boolean>();

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
    console.log('New search input (child): ', value);
    this.onTyped.emit(value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

}
