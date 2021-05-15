import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalEventsService } from 'src/app/events/global-events.service';

@Component({
  selector: 'app-abstract-data-main',
  templateUrl: './abstract-data-main.component.html',
  styleUrls: ['./abstract-data-main.component.scss']
})
export class AbstractDataMainComponent implements OnInit {
  @Input()
  cols: any;
  @Input()
  filters: any;
  @Input()
  globalFilterFields: any;
  @Input()
  values: any;
  @Input()
  dataKey = "id";
  @Input()
  selectedItem: any;
  @Output()
  selectedItemChange = new EventEmitter<any>();

  @Output()
  onOpenEdit = new EventEmitter<void>();
  @Output()
  onSave = new EventEmitter<void>();
  @Output()
  onRemove = new EventEmitter<any>();

  showDialog = false;

  constructor(protected globalEventsService: GlobalEventsService) { }

  ngOnInit(): void {
    this.globalEventsService.showDialog.subscribe((show: boolean) => this.showDialog = show);
  }

  onRowSelected() {
    this.selectedItemChange.emit(this.selectedItem);
  }

  openAdd() {
    this.selectedItemChange.emit({});
    this.onOpenEdit.emit();
    this.showDialog = true;
  }

  openEdit(item: any) {
    this.selectedItem = item;
    this.selectedItemChange.emit(this.selectedItem);
    this.onOpenEdit.emit();
    this.showDialog = true;
  }

  remove(item: any) {
    this.onRemove.emit(item);
  }

  hideDialog() {
    this.showDialog = false;
  }

  save() {
    this.onSave.emit();
  }

  static stringIsFilled(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  static numberIsFilled(value: number): boolean {
    return value !== undefined && value !== null;
  }
}
