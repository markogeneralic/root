import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FilterService } from 'primeng/api';
import { Table } from 'primeng/table';
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

  @ViewChild("dt") dt: Table;

  showDialog = false;

  constructor(protected globalEventsService: GlobalEventsService, protected filterService: FilterService) { }

  ngOnInit(): void {
    this.globalEventsService.showDialog.subscribe((show: boolean) => this.showDialog = show);

    this.globalEventsService.filterTable.subscribe(data => {
      this.dt.filter(data.value, data.column, data.type);
    });

    this.filterService.register('dateRange', (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
          return false;
      }

      const d = new Date(value);
      const dates = filter.split('..');

      let reDay = new RegExp('[0-3][0-9]');
      let reMonth = new RegExp('[0-1][0-9]');
      let reYear = new RegExp('[0-9]{4}');

      const dStart = dates[0].split('.');
      const startValid = dStart.length === 3 && reDay.test(dStart[0]) && reMonth.test(dStart[1]) && reYear.test(dStart[2]);

      if (dates.length === 1) {
        return this.sameDay(d, new Date(dStart[1]+'/'+dStart[0]+'/'+dStart[2]))
      }

      const dEnd = dates[1].split('.');
      const endValid = dEnd.length === 3 && reDay.test(dEnd[0]) && reMonth.test(dEnd[1]) && reYear.test(dEnd[2]);

      if (startValid && endValid) {
        return d >= new Date(dStart[1]+'/'+dStart[0]+'/'+dStart[2]) && d <= new Date(dEnd[1]+'/'+dEnd[0]+'/'+dEnd[2]);
      } else if (startValid && !endValid) {
        return d >= new Date(dStart[1]+'/'+dStart[0]+'/'+dStart[2]);
      } else if (!startValid && endValid) {
        return d <= new Date(dEnd[1]+'/'+dEnd[0]+'/'+dEnd[2]);
      } else {
        return true;
      }
    });
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

  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }
}
