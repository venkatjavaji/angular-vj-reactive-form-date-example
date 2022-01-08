import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import moment = require('moment');
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  title = 'Date validation';
  minFromDate = '';
  maxFromDate = '';
  minToDate;
  maxToDate;
  formGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      fromDate: '',
      toDate: '',
    });
  }
  ngOnInit(): void {}

  /**
   * From Date ::
      1. Always minFromDate = currentDate
      2. Assigning maxFromDate
        - if toDate has value
          yes - maxFromDate = toDate - 1day
        - else
          maxFromDate = unlimited

    To Date ::
      1. Assigning minToDate
        check if fromDate has value
        - yes
          minToDate = fromDate + 1day
        - else 
          minToDate = currentDate + 1day
      2.	Always maxToDate = unlimited
   */
  onClickDate(selectedDate) {
    let currentDay = moment(new Date()).format('YYYY-MM-DD');
    if (selectedDate == 'fromDate') {
      this.minFromDate = currentDay;
      let selectedToDateValue = this.formGroup.value.toDate;
      if (selectedToDateValue) {
        this.maxFromDate = moment(selectedToDateValue)
          .add(-1, 'day')
          .format('YYYY-MM-DD');
      }
    } else if (selectedDate == 'toDate') {
      let selectedFromDateValue = this.formGroup.value.fromDate;
      let minToDateValue = selectedFromDateValue ? selectedFromDateValue : currentDay;
      this.minToDate =  moment(minToDateValue).add(1, 'day').format('YYYY-MM-DD');
    }
  }
}
