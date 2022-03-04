import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { urlConstant } from 'src/app/@shared/constant/urlConstant';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { CustomValidators } from 'src/app/@shared/validatores/custom.validator';
import { Globals } from 'src/app/globals';
import { UserDetailModalComponent } from '../user-detail-modal/user-detail-modal.component';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {

  @Input() user: any = {};
  userBalance: any = {
    totalBalance: 0,
    earnedBalance: 0,
    currentBalance: 0,
    pendingBalance: 0,
    cancelBalance: 0  
  }
  paymentForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private commonService: CommonService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal
  ) {    
    this.createForm();
  }

  ngOnInit(): void {
    this.setTotalBalance();
  }

  createForm(defaultData: any = {}): void {
    this.paymentForm = this.formBuilder.group({
      pay: [ defaultData?.pay || '', [Validators.required, CustomValidators.isDecimal, Validators.min(1), Validators.max(this.user?.currentBalance)] ],
      isClicked: [false],
      isSubmited: [false],
    });        
  }

  get isClicked(): FormControl {
    return this.paymentForm.get('isClicked') as FormControl;
  }

  get isSubmited(): FormControl {
    return this.paymentForm.get('isSubmited') as FormControl;
  }

  get pay(): FormControl {
    return this.paymentForm.get('pay') as FormControl;
  }

  submit(): void {
    this.isClicked.setValue(true);
    this.toastService.removeAll();

    if (this.paymentForm.invalid && this.isSubmited.value === false) {
      this.paymentForm.markAllAsTouched();
      this.toastService.error('Please enter valid values.');
      return;
    } else if (this.isSubmited.value === true) {
      this.toastService.info('Please wait your data proccing.');
      return;
    } else {
      this.isSubmited.setValue(true);

      const reqData = {
        pay: this.pay.value,
        userId: this.user._id
      };
      
      this.commonService.insert(urlConstant.Payment.Insert, reqData).pipe(take(1)).subscribe((res) => {
        if (res.status === 200) {
          this.toastService.success('Payment done.');
          this.resetForm();          
        }
      }, (error) => {        
        this.toastService.error(error.message);
      }).add(() => {
        this.isSubmited.setValue(false);
      });
    }
  }

  openUserDetailModal(): void {
    this.activeModal.close('Back click');
    const modalRef = this.ngbModal.open(UserDetailModalComponent, { size: 'xl', scrollable: true, modalDialogClass: 'modal-fullscreen-sm-down' });
    modalRef.componentInstance.user = this.user;
  }

  setTotalBalance(): void {
    this.userBalance.totalBalance = parseFloat(this.user?.earnedBalance) + parseFloat(this.user?.currentBalance) + parseFloat(this.user?.pendingBalance) + parseFloat(this.user?.cancelBalance);    
    this.userBalance.earnedBalance = (this.user?.earnedBalance > 0) ? parseInt(((this.user?.earnedBalance * 100) / this.userBalance.totalBalance).toString()) : 0;
    this.userBalance.currentBalance = (this.user?.currentBalance > 0) ? parseInt(((this.user?.currentBalance * 100) / this.userBalance.totalBalance).toString()) : 0;
    this.userBalance.pendingBalance = (this.user?.pendingBalance > 0) ? parseInt(((this.user?.pendingBalance * 100) / this.userBalance.totalBalance).toString()) : 0;
    this.userBalance.cancelBalance = (this.user?.cancelBalance > 0) ? parseInt(((this.user?.cancelBalance * 100) / this.userBalance.totalBalance).toString()) : 0;
  }

  resetForm(validationFlag: boolean = false): void {
    this.paymentForm.reset();
    this.isClicked.setValue(validationFlag);
    this.isSubmited.setValue(false);

    if (validationFlag === true) {
      this.paymentForm.markAllAsTouched();
    }
  }

  isFormSubmittedAndError(
    controlName: string,
    errorName: string = '',
    notError: Array<string> = new Array()
  ): any {
    return Globals.isFormSubmittedAndError(
      this.paymentForm,
      this.paymentForm.touched ? 1 : 0,
      controlName,
      errorName,
      notError
    );
  }
}
