import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { ImgLightboxModalComponent } from 'src/app/@shared/components/img-lightbox-modal/img-lightbox-modal.component';
import { urlConstant } from 'src/app/@shared/constant/urlConstant';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss']
})
export class TaskDetailModalComponent implements OnInit {

  @Input() task: any = {};
  users: any = [];
  backendUrl = environment.backendUrl || '';

  constructor(
    public activeModal: NgbActiveModal,
    private commonService: CommonService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit(): void {    
    this.getUsersBytask();
  }

  getUsersBytask(): void {
    if (this.task?.users) {
      this.commonService.post(`${urlConstant.User.Ids}`, { users: this.task?.users }).pipe(take(1)).subscribe((res: any) => {
        if (res.status === 200) {
          this.users = res?.data || [];                    
        }
      }, () => {
        this.users = [];
      });
    }
  }

  opneImgLightboxModal(url: string = ''): void {
    const modalRef = this.ngbModal.open(ImgLightboxModalComponent, { modalDialogClass: 'modal-fullscreen', scrollable: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.url = url;
  }

  downloadImage(fileName: string, url: string = ''): void {
    this.commonService.download(urlConstant.Task.Download, { fileName: `${fileName}.jpg`, url: url }).pipe(take(1)).subscribe();
  }

  trackById(index: number, item: any = {}) {
    return item._id
  }
}
