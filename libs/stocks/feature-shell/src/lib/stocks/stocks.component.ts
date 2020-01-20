import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';

import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  maxDate = new Date();
  error: string;

  quotes$ = this.priceQuery.priceQueries$;
  quotesError$ = this.priceQuery.priceQueriesError$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.quotesError$.subscribe(error => {
      this.error = error ? 'error: ' + error.error : null;
    });
  }

  verifyAndUpdateToDate() {
    const formValue = this.stockPickerForm.value;
    if (formValue.toDate < formValue.fromDate) {
      this.stockPickerForm.patchValue({ toDate: formValue.fromDate });
    }
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      this.error = null;
      this.verifyAndUpdateToDate();

      const { symbol, fromDate, toDate } = this.stockPickerForm.value;

      const yearsDiff = moment().diff(fromDate, 'years', true);
      const period =
        yearsDiff > 5
          ? 'max'
          : yearsDiff > 2
          ? '5y'
          : yearsDiff > 1
          ? '2y'
          : yearsDiff > 0.5
          ? '1y'
          : '6m';

      this.priceQuery.fetchQuote(symbol, period, fromDate, toDate);
    }
  }
}
