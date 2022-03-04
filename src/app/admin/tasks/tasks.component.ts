import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SlideInOut } from 'src/app/@shared/animations/slide-in-out.animation';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { Globals } from 'src/app/globals';
import { urlConstant } from 'src/app/@shared/constant/urlConstant';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ImgCropperModalComponent } from 'src/app/@shared/components/img-cropper-modal/img-cropper-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { TaskDetailModalComponent } from './task-detail-modal/task-detail-modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [SlideInOut]
})
export class TasksComponent implements OnInit {
  
  taskForm!: FormGroup;
  filterForm!: FormGroup;
  isAddSectionOpen: boolean = false;
  taskTypes: string[] = [];
  mapConfig: any = {
    latitude: 0,
    longitude: 0,
    zoom: 12    
  }
  tasks: any = {
    data: [],
    isLoading: false  
  };
  isAdvanceSearchSectionOpen = false;
  shops: any = [];
  taskFile!: File;
  backendUrl = environment.backendUrl || '';
  
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private commonService: CommonService,
    private ngbModal: NgbModal,
    private route: ActivatedRoute 
  ) {
    this.createForm();

    this.commonService.get(urlConstant.Shared.GetConstants).pipe(take(1)).subscribe((res: any) => {
      if (res.status === 200) {
        const constants = res?.data || {};
        this.taskTypes = constants?.taskTypes || [];           
      }
    }, () => {
      this.taskTypes = [];           
    });

    this.commonService.post(urlConstant.Shop.GetAll).pipe(take(1)).subscribe((res: any) => {
      if (res.status === 200) {
        this.shops = res?.data || [];
      }
    }, () => {
      this.shops = [];           
    });

    this.filterForm = this.formBuilder.group({ 
      advanceSearchForm: this.formBuilder.group({
        shop: ['']
      }),
      search: [''],
      page: [1],
      documents: [0],
      perPage: [6]
    });

    this.filterForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((search: string) => {
      this.getTasks();            
    });
  }

  ngOnInit(): void {        
    this.tasks.isLoading = true;
    
    const searchBy = this.route.snapshot.paramMap.get('searchBy') || '';
    const search = this.route.snapshot.paramMap.get('search') || '';    
    if (searchBy === 'shop' && search) {
      this.advanceSearchForm.get('shop')?.setValue(search);
      this.isAdvanceSearchSectionOpen = true;
    } else {
      this.getTasks();
    }
  }

  createForm(defaultData: any = {}): void {
    if (defaultData?._id) {
      this.isAddSectionOpen = true;
    }
    
    this.taskForm = this.formBuilder.group({
      _id: [defaultData?._id || ''],
      title: [ defaultData?.title || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)] ],
      type: [ defaultData?.type || '', [Validators.required] ],
      reward: [ defaultData?.reward || '', [Validators.required, Validators.min(1), Validators.max(100000)] ],
      rewardOnViews: [ defaultData?.rewardOnViews || '', [Validators.required, Validators.min(1), Validators.max(100000)] ],
      shop: [ defaultData?.shop?._id || '', [Validators.required] ],
      task: [ defaultData?.task ? `${this.backendUrl}${defaultData?.task}` : '', [Validators.required] ],
      isClicked: [false],
      isSubmited: [false],
    });        
  }

  get _id(): FormControl {
    return this.taskForm.get('_id') as FormControl;
  }

  get task(): FormControl {
    return this.taskForm.get('task') as FormControl;
  }

  get isClicked(): FormControl {
    return this.taskForm.get('isClicked') as FormControl;
  }

  get isSubmited(): FormControl {
    return this.taskForm.get('isSubmited') as FormControl;
  }

  get advanceSearchForm(): FormGroup {
    return this.filterForm.get('advanceSearchForm') as FormGroup;
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
  
  isFormSubmittedAndError(
    controlName: string,
    errorName: string = '',
    notError: Array<string> = new Array()
  ): any {
    return Globals.isFormSubmittedAndError(
      this.taskForm,
      this.isClicked.value,
      controlName,
      errorName,
      notError
    );
  }

  getTasks(): void {
    const filters = this.filterForm.value;
    
    this.commonService.post(urlConstant.Task.Get, filters).pipe(take(1)).subscribe((tasks: any) => {
      this.tasks.isLoading = false;
      
      if (tasks.status === 200) {
        this.tasks.data = tasks?.data || [];
        this.documents.patchValue(tasks?.documents || 0, { onlySelf: true });
      }
    }, () => {
      this.tasks.isLoading = false;
      this.tasks.data = [];
    });
  }

  submit(): void {
    this.isClicked.setValue(true);
    this.toastService.removeAll();

    if (this.taskForm.invalid && this.isSubmited.value === false) {
      this.taskForm.markAllAsTouched();
      this.toastService.error('Please enter valid values.');
      return;
    } else if (this.isSubmited.value === true) {
      this.toastService.info('Please wait your data proccing.');
      return;
    } else {
      this.isSubmited.setValue(true);

      const reqData = this.taskForm.value;
      delete reqData.task;
      const formDataBody = Globals.jsonToFormData(reqData);
      formDataBody.append('image', this.taskFile)
      
      this.commonService.insertOrUpdateFormData(this._id.value ? urlConstant.Task.Update : urlConstant.Task.Insert, formDataBody, this._id.value).pipe(take(1)).subscribe((res) => {
        if (res.status === 200) {
          this.toastService.success(this._id.value ? 'Task updated successfully.' : 'New task created successfully.');
          this.resetForm();
          this.getTasks();
        }
      }, (error) => {        
        this.toastService.error(error.message);
      }).add(() => {
        this.isSubmited.setValue(false);
      });
    }
  }

  editForm(task: any = {}): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.createForm(task);
  }

  deleteRecord(id: string = ''): void {
    this.commonService.delete(urlConstant.Task.Delete, id).pipe(take(1)).subscribe((res) => {
      if (res.status === 200) {
        this.toastService.success('Task deleted successfully.');
        this.getTasks();
      }
    }, (error) => {        
      this.toastService.error(error.message);
    });
  }

  resetForm(validationFlag: boolean = false): void {
    this.taskForm.reset();
    this.isClicked.setValue(validationFlag);
    this.isSubmited.setValue(false);

    if (validationFlag === true) {
      this.taskForm.markAllAsTouched();
    }
  }

  resetAdvanceSearch(): void {
    this.advanceSearchForm.reset();
  }

  openImgCropperModal(id: string = ''): void {
    const modalRef = this.ngbModal.open(ImgCropperModalComponent, { size: 'lg', backdrop: 'static', keyboard: false, modalDialogClass: 'modal-fullscreen-sm-down' });
    modalRef.componentInstance.name = 'World';

    modalRef.closed.subscribe((res: any) => {
      if (res.file) {
        this.taskFile = res.file as File;
        this.task.setValue(res.base64);  
      }
    });
  }

  opneTaskDetailModal(task: any = {}): void {
    const modalRef = this.ngbModal.open(TaskDetailModalComponent, { size: 'xl', scrollable: true, modalDialogClass: 'modal-fullscreen-sm-down' });
    modalRef.componentInstance.task = JSON.parse(JSON.stringify(task));
  }

  trackById(index: number, item: any = {}) {
    return item._id
  }
}
