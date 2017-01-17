import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {SelectComponent} from "ng2-select";

@Component({
  selector: 'myselect',
  templateUrl: './myselect.component.html',
  styleUrls: ['./myselect.component.css']
})
export class MyselectComponent implements OnInit {
  items:Array<any>;

  @ViewChild('mySelect')
  private mySelect: SelectComponent;

  @Output() onTyped = new EventEmitter<boolean>();
  @Output() onSelected = new EventEmitter<boolean>();
  @Output() onRemoved = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  clearArtistSelect() {
    if (this.mySelect) {
      let activeItem = this.mySelect.activeOption;
      if (activeItem) {
        this.mySelect.remove(activeItem)
      }
    }
  }

  private value:any = {};

  public selected(value:any):void {
    console.log('Selected value is: ', value);
    this.onSelected.emit(value.text);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
    this.onRemoved.emit();
  }

  public typed(value:any):void {
    console.log('New search input (child): ', value);
    this.onTyped.emit(value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

}
