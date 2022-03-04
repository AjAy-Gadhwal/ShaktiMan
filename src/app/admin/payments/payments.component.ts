import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { urlConstant } from 'src/app/@shared/constant/urlConstant';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ToastService } from 'src/app/@shared/services/toast.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  filterForm!: FormGroup;
  payments: any = {
    data: [],
    isLoading: false  
  };
  private geoCoder: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private commonService: CommonService    
  ) {
    this.filterForm = this.formBuilder.group({ 
      search: [''],
      page: [1],
      documents: [0],
      perPage: [6]
    });

    this.filterForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((search: string) => {
      this.getPayments();            
    });
  }

  ngOnInit(): void {    
    this.payments.isLoading = true;
    this.getPayments();
  }

  get search(): FormControl {
    return this.filterForm.get('search') as FormControl;
  }

  get page(): FormControl {
    return this.filterForm.get('page') as FormControl;
  }

  get documents(): FormControl {
    return this.filterForm.get('documents') as FormControl;
  }

  get perPage(): FormControl {
    return this.filterForm.get('perPage') as FormControl;
  }

  getPayments(): void {
    const filters = this.filterForm.value;
    
    this.commonService.post(urlConstant.Payment.Get, filters).pipe(take(1)).subscribe((payments: any) => {
      this.payments.isLoading = false;
      
      if (payments.status === 200) {
        this.payments.data = payments?.data || [];
        this.documents.patchValue(payments?.documents || 0, { onlySelf: true });
      }
    }, () => {
      this.payments.isLoading = false;
      this.payments.data = [];
    });
  }

  trackById(index: number, item: any = {}) {
    return item._id
  }
}
