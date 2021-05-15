import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GlobalEventsService } from 'src/app/events/global-events.service';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country/country.service';
import { AbstractDataMainComponent } from '../abstract/abstract-data-main/abstract-data-main.component';

@Component({
  selector: 'app-country-main',
  templateUrl: './country-main.component.html',
  styleUrls: ['./country-main.component.scss']
})
export class CountryMainComponent implements OnInit {

  cols = [
    {
      field: 'name',
      header: 'Country'
    },
    {
      field: 'code',
      header: 'Abbreviation'
    }
  ];

  filters = [
    {
      field: 'name',
      type: 'text'
    },
    {
      field: 'code',
      type: 'text'
    }
  ];

  countries: Country[];
  selectedCountry: Country;
  editCountry: Country;

  constructor(protected countryService: CountryService, protected messageService: MessageService, protected globalEventsService: GlobalEventsService) { }

  ngOnInit(): void {
    this.selectedCountry = new Country();
    this.editCountry = new Country();
    this.countryService.getAll().subscribe(data => {
      this.countries = data;
    })
  }

  onOpenEdit() {
    this.editCountry = Object.assign({}, this.selectedCountry);
  }

  onSave() {
    if (AbstractDataMainComponent.stringIsFilled(this.editCountry.name) && AbstractDataMainComponent.stringIsFilled(this.editCountry.code)) {
      this.countryService.save(this.editCountry).subscribe(() => {
        this.globalEventsService.triggerShowDialog(false);
        this.refresh();
      });
    }
  }

  onRemove(country: Country) {
    this.countryService.delete(country.id).subscribe(res => this.refresh(), err => this.showToast(err));
  }

  refresh() {
    this.countryService.getAll().subscribe(data => {
      this.countries = data;
    });
  }

  showToast(err: any) {
    this.messageService.add({key: 'br-toast', severity:'error', summary: 'Error', detail: err.error});
  }
}
