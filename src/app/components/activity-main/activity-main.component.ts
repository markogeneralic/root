import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GlobalEventsService } from 'src/app/events/global-events.service';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { AbstractDataMainComponent } from '../abstract/abstract-data-main/abstract-data-main.component';

@Component({
  selector: 'app-activity-main',
  templateUrl: './activity-main.component.html',
  styleUrls: ['./activity-main.component.scss']
})
export class ActivityMainComponent implements OnInit {

  cols = [
    {
      field: 'name',
      header: 'Activity'
    },
    {
      field: 'note',
      header: 'Note'
    }
  ];

  filters = [
    {
      field: 'name',
      type: 'text'
    },
    {
      field: 'note',
      type: 'containsText'
    }
  ];

  activities: Activity[];
  selectedActivity: Activity;
  editActivity: Activity;

  constructor(protected activityService: ActivityService, protected messageService: MessageService, protected globalEventsService: GlobalEventsService) { }

  ngOnInit(): void {
    this.selectedActivity = new Activity();
    this.editActivity = new Activity();
    this.activityService.getAll().subscribe(data => {
      this.activities = data;
    });
  }

  onOpenEdit() {
    this.editActivity = Object.assign({}, this.selectedActivity);
  }

  onSave() {
    if (AbstractDataMainComponent.stringIsFilled(this.editActivity.name)) {
      this.activityService.save(this.editActivity).subscribe(() => {
        this.globalEventsService.triggerShowDialog(false);
        this.refresh();
      });
    }
  }

  onRemove(activity: Activity) {
    this.activityService.delete(activity.id).subscribe(() => {
      this.refresh();
    })
  }

  refresh() {
    this.activityService.getAll().subscribe(data => {
      this.activities = data;
    });
  }

  showToast(err: any) {
    this.messageService.add({key: 'br-toast', severity:'error', summary: 'Error', detail: err.error});
  }
}
