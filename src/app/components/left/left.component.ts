import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MenuItem } from 'primeng/api';
import { GlobalEventsService } from 'src/app/events/global-events.service';
import { Panel } from 'src/app/models/panel';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
  menuItems: MenuItem[];

  activePanel = Panel.dashboard;

  products: Product[];
  selectedProduct: Product;

  filters: any[] = [];
  filterOptions: any[] = [];
  selectedFilterOptions: any;
  showFilters: boolean = false;

  reDate = new RegExp('^(?:(?:31(\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$');
  invalidDateFormat = false;

  constructor(protected globalEventsService: GlobalEventsService, protected productService: ProductService) { }

  ngOnInit(): void {
    this.openDashboard();

    this.globalEventsService.requestProduct.subscribe(() => this.globalEventsService.triggerSelectProduct(this.selectedProduct));

    this.menuItems = [
      {
        label: 'DASHBOARD',
        routerLink: ['/dashboard'],
        routerLinkActiveOptions: { exact: true },
        command: () => this.openDashboard()
      },
      {
        label: 'DATA INPUT',
        routerLink: ['/data'],
        routerLinkActiveOptions: { exact: true },
        command: () => this.openEventsPanel()
      },
      {
        label: 'MASTER DATA',
        items: [
          {
            label: 'Country',
            routerLink: ['/country'],
            routerLinkActiveOptions: { exact: true },
            command: () => this.openCountryPanel()
          },
          {
            label: 'Product',
            routerLink: ['/product'],
            routerLinkActiveOptions: { exact: true },
            command: () => this.openProductPanel()
          },
          {
            label: 'Activity',
            routerLink: ['/activity'],
            routerLinkActiveOptions: { exact: true },
            command: () => this.openActivityPanel()
          }
        ]
      }
    ];
  }

  export() {
    html2canvas(document.querySelector("#parentdiv")).then(canvas => {
      var pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);

      var imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData,0,0,canvas.width, canvas.height);
      pdf.save(this.selectedProduct.name+'.pdf');
      // pdf.save(this.selectedProduct.name+' ('+this.year+').pdf');

    });
  }

  onSelectProduct(product: Product) {
    this.selectedProduct = product;
    this.globalEventsService.triggerSelectProduct(this.selectedProduct);
  }

  openDashboard() {
    this.activePanel = Panel.dashboard;
    this.productService.getAll().subscribe(data => {
      this.products = data;
      if (this.products !== undefined && this.products !== null && this.products.length > 0) {
        this.selectedProduct = this.products[0];
        this.globalEventsService.triggerSelectProduct(this.selectedProduct);
      }
    });
  }

  openEventsPanel() {
    this.filters = [];
    this.activePanel = Panel.event;
    this.filterOptions = [
      { id: 0, name: 'Country', column: 'country', type: 'contains' },
      { id: 1, name: 'Activity', column: 'activity', type: 'contains' },
      { id: 2, name: 'Product', column: 'product', type: 'contains' },
      { id: 3, name: 'Date', column: 'date', type: 'dateRange' },
      { id: 4, name: 'Note', column: 'note', type: 'contains' },
    ];
    this.invalidDateFormat = false;
  }

  openCountryPanel() {
    this.filters = [];
    this.activePanel = Panel.country;
    this.filterOptions = [
      { id: 0, name: 'Country', column: 'name', type: 'contains' },
      { id: 1, name: 'Abbreviation', column: 'code', type: 'contains' }
    ];
  }

  openProductPanel() {
    this.filters = [];
    this.activePanel = Panel.product;
    this.filterOptions = [
      { id: 0, name: 'Name', column: 'name', type: 'contains' },
      { id: 1, name: 'Note', column: 'note', type: 'contains' }
    ];
  }

  openActivityPanel() {
    this.filters = [];
    this.activePanel = Panel.activity;
    this.filterOptions = [
      { id: 0, name: 'Name', column: 'name', type: 'contains' },
      { id: 1, name: 'Note', column: 'note', type: 'contains' }
    ];
  }

  onShowFilters() {
    this.showFilters = true;
  }

  addFilter(event: any) {
    console.log(event);
    this.showFilters = false;
    this.filters.push({
      id: event.value.id,
      name: event.value.name,
      column: event.value.column,
      type: event.value.type,
      value: ''
    });
    const index = this.filterOptions.findIndex(f => f.id === event.value.id);
    this.filterOptions.splice(index, 1);
  }

  search(column: string, value: string, type: string) {
    if (type === 'dateRange') {
      const dates = value.split('..');
      this.invalidDateFormat = dates.length < 1 || dates.length > 2 || (dates[0].length !== 0 && !this.reDate.test(dates[0])) || (dates.length === 2 && (dates[1].length !== 0 && !this.reDate.test(dates[1])));
      if (!this.invalidDateFormat) {
        this.globalEventsService.triggerFilterTable(column, value, type);
      }
    } else {
      this.globalEventsService.triggerFilterTable(column, value, type);
    }
  }

  removeFilter(filter: any) {
    if (filter.type === 'dateRange') {
      this.invalidDateFormat = false;
    }
    const index = this.filters.findIndex(f => f.id === filter.id);
    if (index !== -1) {
      this.filters.splice(index, 1);
      this.search(filter.column, null, null);
    }
    this.filterOptions.push({
      id: filter.id,
      name: filter.name,
      column: filter.column,
      type: filter.type
    });
    this.filterOptions.sort((a, b) => (a.id > b.id) ? 1 : -1);
  }

  public get panel(): typeof Panel {
    return Panel;
  }
}
