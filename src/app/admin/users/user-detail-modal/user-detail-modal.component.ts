import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { ImgLightboxModalComponent } from 'src/app/@shared/components/img-lightbox-modal/img-lightbox-modal.component';
import { urlConstant } from 'src/app/@shared/constant/urlConstant';
import { CommonService } from 'src/app/@shared/services/common.service';
import { environment } from 'src/environments/environment';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.scss']
})
export class UserDetailModalComponent implements OnInit {

  @Input() user: any = {};
  tasks: any = [];
  userBalance: any = {
    totalBalance: 0,
    earnedBalance: 0,
    currentBalance: 0,
    pendingBalance: 0,
    cancelBalance: 0  
  };
  backendUrl = environment.backendUrl || '';

  constructor(
    public activeModal: NgbActiveModal,
    private commonService: CommonService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUserById();
  }

  taskPayment(taskId: string = '', isPayment: boolean = false): void {
    if (taskId && this.user?._id) {
      this.commonService.post(urlConstant.Task.Payment, { _id: taskId, userId: this.user?._id, payment: isPayment }).pipe(take(1)).subscribe((res: any) => {
        if (res.status === 200) {
          this.getUserById();
        }
      });
    }
  }

  getUserById(): void {
    if (this.user?._id) {
      this.commonService.get(`${urlConstant.User.GetById}?id=${this.user._id}`).pipe(take(1)).subscribe((res: any) => {
        if (res.status === 200) {
          this.user = res?.data || [];          
          this.tasks = this.user.tasks || [];
          this.setTotalBalance();
          console.log('user : ', this.user);          
        }
      }, () => {
        this.tasks = [];
      });
    }
  }

  opnePaymentModal(): void {
    this.activeModal.close('Pay click');
    const modalRef = this.ngbModal.open(PaymentModalComponent, { size: 'lg', modalDialogClass: 'modal-fullscreen-sm-down' });
    modalRef.componentInstance.user = this.user;
  }

  setTotalBalance(): void {
    this.userBalance.totalBalance = parseFloat(this.user?.earnedBalance) + parseFloat(this.user?.currentBalance) + parseFloat(this.user?.pendingBalance) + parseFloat(this.user?.cancelBalance);    
    this.userBalance.earnedBalance = (this.user?.earnedBalance > 0) ? parseInt(((this.user?.earnedBalance * 100) / this.userBalance.totalBalance).toString()) : 0;
    this.userBalance.currentBalance = (this.user?.currentBalance > 0) ? parseInt(((this.user?.currentBalance * 100) / this.userBalance.totalBalance).toString()) : 0;
    this.userBalance.pendingBalance = (this.user?.pendingBalance > 0) ? parseInt(((this.user?.pendingBalance * 100) / this.userBalance.totalBalance).toString()) : 0;
    this.userBalance.cancelBalance = (this.user?.cancelBalance > 0) ? parseInt(((this.user?.cancelBalance * 100) / this.userBalance.totalBalance).toString()) : 0;
  }

  opneImgLightboxModal(url: string = ''): void {
    const modalRef = this.ngbModal.open(ImgLightboxModalComponent, { modalDialogClass: 'modal-fullscreen', scrollable: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.url = url;
  }

  trackById(index: number, item: any = {}) {
    return item._id
  }
}
