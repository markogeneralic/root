import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { Country } from 'src/app/models/country';
import { Product } from 'src/app/models/product';
import { TimelineEvent } from 'src/app/models/timelineEvent';
import { CountryService } from 'src/app/services/country/country.service';
import { EventService } from 'src/app/services/event/event.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  cols = [
    {
      field: 'activity',
      header: 'Activity',
      width: '16%'
    },
    {
      field: 'jan',
      header: 'Jan',
      width: '7%',
      render: 'event'
    },
    {
      field: 'feb',
      header: 'Feb',
      width: '7%',
      render: 'event'
    },
    {
      field: 'mar',
      header: 'Mar',
      width: '7%',
      render: 'event'
    },
    {
      field: 'apr',
      header: 'Apr',
      width: '7%',
      render: 'event'
    },
    {
      field: 'may',
      header: 'May',
      width: '7%',
      render: 'event'
    },
    {
      field: 'jun',
      header: 'Jun',
      width: '7%',
      render: 'event'
    },
    {
      field: 'jul',
      header: 'Jul',
      width: '7%',
      render: 'event'
    },
    {
      field: 'aug',
      header: 'Aug',
      width: '7%',
      render: 'event'
    },
    {
      field: 'sep',
      header: 'Sep',
      width: '7%',
      render: 'event'
    },
    {
      field: 'oct',
      header: 'Oct',
      width: '7%',
      render: 'event'
    },
    {
      field: 'nov',
      header: 'Nov',
      width: '7%',
      render: 'event'
    },
    {
      field: 'dec',
      header: 'Dec',
      width: '7%',
      render: 'event'
    }
  ];

  timelineEvents: TimelineEvent[];

  year = 2021;

  products: Product[];
  selectedProduct: Product;

  countries: Country[];
  selectedCountries: Country[] = [];


  constructor(protected eventService: EventService, protected productService: ProductService, protected countryService: CountryService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
      if (this.products !== undefined && this.products !== null && this.products.length > 0) {
        this.selectedProduct = this.products[0];
      }
      this.refreshTimeline();
    });
    this.countryService.getAll().subscribe(data => {
      this.countries = data;
      if (this.countries !== undefined && this.countries !== null) {
        this.countries.forEach(c => this.selectedCountries.push(c));
      }
      this.refreshTimeline();
    });
  }

  getCountries(events: any[]) {
    if (events) {
      return events.map(e => e.country).join(', ');
    }
  }

  getFontSize(events: any[]) {
    const count = events.length;
    if (count < 7) {
      return '1rem';
    } else if (count < 14) {
      return '0.8rem';
    } else {
      return '0.6rem';
    }
  }

  isEvent(events: any[]) {
    return events !== undefined && events !== null && events.length > 0;
  }

  isNote(events: any[]) {
    return events !== undefined && events !== null && events.find(e => e.note !== undefined && e.note !== null) !== undefined;
  }

  refreshTimeline() {
    if (this.selectedProduct !== undefined) {
      this.eventService.getTimeline(this.selectedProduct.id, this.selectedCountries.map(c => c.id), this.year).subscribe(data => {
        this.timelineEvents = data;
      });
    }
  }

  items: MenuItem[] = [];
  selectedEvent: TimelineEvent;
  showNotes = false;

  setItems(event, cm, events: any[]) {
    event.preventDefault();
    event.stopPropagation();
    this.items = [];
    this.showNotes = false;
    if (events !== undefined && events !== null && Array.isArray(events)) {
      if (events.length > 1) {
        events.forEach(e => {
          if (e.note !== undefined && e.note !== null) {
            this.showNotes = true;
            this.items.push({
              label: e.country,
              items: [{
                label: e.note
              }]
            });
          }
        });
      } else {
        if (events[0].note !== undefined && events[0].note !== null) {
          this.showNotes = true;
          this.items.push({
            label: events[0].note
          });
        }
      }
    }
    cm.show(event);
    return false;
  }

  stopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  onShowNotes(cm: ContextMenu) {
    if (!this.showNotes) {
      cm.hide();
    }
  }

  incrementYear(value: number) {
    this.year += value;
    this.refreshTimeline();
  }

  export() {
    html2canvas(document.querySelector("#parentdiv")).then(canvas => {
      var pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);

      var imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData,0,0,canvas.width, canvas.height);
      pdf.save(this.selectedProduct.name+' ('+this.year+').pdf');

  });
  }
}
