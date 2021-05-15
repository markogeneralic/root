import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GlobalEventsService } from 'src/app/events/global-events.service';
import { Activity } from 'src/app/models/activity';
import { Country } from 'src/app/models/country';
import { PharmaEvent } from 'src/app/models/pharmaEvent';
import { Product } from 'src/app/models/product';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { CountryService } from 'src/app/services/country/country.service';
import { EventService } from 'src/app/services/event/event.service';
import { ProductService } from 'src/app/services/product/product.service';
import { AbstractDataMainComponent } from '../abstract/abstract-data-main/abstract-data-main.component';

@Component({
  selector: 'app-event-main',
  templateUrl: './event-main.component.html',
  styleUrls: ['./event-main.component.scss']
})
export class EventMainComponent implements OnInit {

  cols = [
    {
      field: 'country',
      header: 'Country'
    },
    {
      field: 'product',
      header: 'Product'
    },
    {
      field: 'activity',
      header: 'Activity'
    },
    {
      field: 'date',
      header: 'Date'
    },
    {
      field: 'note',
      header: 'Note'
    },
  ];



  events: PharmaEvent[];
  selectedEvent: PharmaEvent;
  editEvent: PharmaEvent;

  countries: Country[] = [];
  selectedCountry: Country;

  products: Product[] = [];
  selectedProduct: Product;

  activities: Activity[] = [];
  selectedActivity: Activity;

  showDialog = false;

  filters = [
    {
      field: 'country',
      type: 'select',
      options: []
    },
    {
      field: 'product',
      type: 'select',
      options: []
    },
    {
      field: 'activity',
      type: 'select',
      options: []
    },
    {
      field: 'date',
      type: 'dateText'
    },
    {
      field: 'note',
      type: 'containsText'
    }
  ];

  constructor(protected eventService: EventService, protected countryService: CountryService, protected productService: ProductService, protected activityService: ActivityService, protected datePipe: DatePipe, protected globalEventsService: GlobalEventsService) { }

  ngOnInit(): void {
    this.selectedEvent = new PharmaEvent();
    this.editEvent = new PharmaEvent();
    this.eventService.getAll().subscribe(data => {
      this.events = data;
    });
    this.countryService.getAll().subscribe(data => {
      this.countries = data;
      this.filters[0].options = data;
    });
    this.productService.getAll().subscribe(data => {
      this.products = data;
      this.filters[1].options = data;
    });
    this.activityService.getAll().subscribe(data => {
      this.activities = data;
      this.filters[2].options = data;
    });
  }

  onOpenEdit() {
    this.editEvent = Object.assign({}, this.selectedEvent);
    if (this.editEvent.id !== undefined) {
      this.selectedCountry = this.countries.find(c => c.id === this.editEvent.countryId);
      this.selectedActivity = this.activities.find(a => a.id === this.editEvent.activityId);
      this.selectedProduct = this.products.find(p => p.id === this.editEvent.productId);
    } else {
      this.selectedCountry = undefined;
      this.selectedProduct = undefined;
      this.selectedActivity = undefined;
    }
  }

  onSave() {
    this.editEvent.activityId = this.selectedActivity.id;
    this.editEvent.countryId = this.selectedCountry.id;
    this.editEvent.productId = this.selectedProduct.id;
    this.editEvent.date = this.datePipe.transform(this.editEvent.date, 'MM-dd-yyyy');
    if (AbstractDataMainComponent.stringIsFilled(this.editEvent.date) && AbstractDataMainComponent.numberIsFilled(this.editEvent.activityId) && AbstractDataMainComponent.numberIsFilled(this.editEvent.productId) && AbstractDataMainComponent.numberIsFilled(this.editEvent.countryId)) {
      this.eventService.save(this.editEvent).subscribe(() => {
        this.globalEventsService.triggerShowDialog(false);
        this.refresh();
      });
    }
  }

  onRemove(event: PharmaEvent) {
    this.eventService.delete(event.id).subscribe(() => {
      this.refresh();
    });
  }

  refresh() {
    this.eventService.getAll().subscribe(data => {
      this.events = data;
    });
  }

}
