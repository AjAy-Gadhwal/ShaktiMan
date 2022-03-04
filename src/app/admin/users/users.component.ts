import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SlideInOut } from 'src/app/@shared/animations/slide-in-out.animation';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { Globals } from 'src/app/globals';
import { MapsAPILoader } from '@agm/core';
import { urlConstant } from 'src/app/@shared/constant/urlConstant';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';
import { ImgLightboxModalComponent } from 'src/app/@shared/components/img-lightbox-modal/img-lightbox-modal.component';
import { CustomValidators } from 'src/app/@shared/validatores/custom.validator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [SlideInOut]
})
export class UsersComponent implements OnInit {
  
  private shopAddressGoogleMap!: ElementRef;
  @ViewChild('shopAddressGoogleMap', { static: false }) set shopAddressTextbox(shopAddressTextbox: ElementRef) {
      if(shopAddressTextbox) {
          this.shopAddressGoogleMap = shopAddressTextbox;
          this.addressAutoComplete();
      }
  }

  userForm!: FormGroup;
  filterForm!: FormGroup;
  isAddSectionOpen: boolean = false;
  shopTypes: string[] = [];
  taskTypes: string[] = [];
  mapConfig: any = {
    latitude: 0,
    longitude: 0,
    zoom: 12    
  }
  users: any = {
    data: [],
    isLoading: false  
  };
  birthDateOption = {
    days: [0],
    months: [0],
    years: [0]
  }
  interestOptions = [];
  private geoCoder: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private commonService: CommonService,
    private ngbModal: NgbModal
  ) {
    const currentYear = new Date().getFullYear() - 13;

    this.birthDateOption.days = Globals.createArrayRange(1, 31);
    this.birthDateOption.months = Globals.createArrayRange(1, 12);
    this.birthDateOption.years = Globals.createArrayRange(1950, currentYear).reverse();    

    this.commonService.get(urlConstant.Shared.GetInterests).pipe(take(1)).subscribe((res: any) => {
      if (res.status === 200) {
        this.interestOptions = res?.data || [];
      }
    }, () => {
      this.interestOptions = [];     
    });

    this.createForm();

    this.commonService.get(urlConstant.Shared.GetConstants).pipe(take(1)).subscribe((res: any) => {
      if (res.status === 200) {
        const constants = res?.data || {};
        this.shopTypes = constants?.shopTypes || [];
        this.taskTypes = constants?.taskTypes || [];           
      }
    }, () => {
      this.shopTypes = [];
      this.taskTypes = [];           
    });

    this.filterForm = this.formBuilder.group({ 
      search: [''],
      page: [1],
      documents: [0],
      perPage: [6]
    });

    this.filterForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((search: string) => {
      this.getUsers();            
    });
  }

  ngOnInit(): void {    
    this.mapsAPILoader.load().then(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {        
          this.mapConfig.latitude = position.coords.latitude;
          this.mapConfig.longitude = position.coords.longitude;
        });
      }
          
      this.geoCoder = new google.maps.Geocoder;            
    });
    
    this.users.isLoading = true;
    this.getUsers();
  }

  createForm(defaultData: any = {}): void {
    if (defaultData?._id) {
      this.isAddSectionOpen = true;
    }
    
    const birthDate = moment(defaultData?.birthDate || '');    
    
    this.userForm = this.formBuilder.group({
      _id: [defaultData?._id || ''],
      firstName: [defaultData?.firstName || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      lastName: [defaultData?.lastName || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: [defaultData?.email || '', [Validators.required, Validators.email]],
      zipCode: [defaultData?.zipCode || '', [Validators.required, Validators.minLength(5), Validators.maxLength(7), CustomValidators.isNumber]],
      birthDate: this.formBuilder.group({
        day: [birthDate.date() || '', [Validators.required]],
        month: [(birthDate.month() + 1) || '', [Validators.required]],
        year: [birthDate.year() || '', [Validators.required]]
      }),
      gender: [defaultData?.gender || '', [Validators.required]],
      interests: [defaultData?.interests || [], [Validators.required]],      
      instagramHandle: [defaultData?.instagramHandle || '', [Validators.required]],
      instagramFollowers: [defaultData?.instagramFollowers || '', [Validators.required, CustomValidators.isNumber]],       
      isClicked: [false],      
      isSubmited: [false],      
    });
  }

  get _id(): FormControl {
    return this.userForm.get('_id') as FormControl;
  }

  get isClicked(): FormControl {
    return this.userForm.get('isClicked') as FormControl;
  }

  get isSubmited(): FormControl {
    return this.userForm.get('isSubmited') as FormControl;
  }

  get shopAddress(): FormControl {
    return this.userForm.get('shopAddress') as FormControl;
  }

  get shopLocation(): FormControl {
    return this.userForm.get('shopLocation') as FormControl;
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
      this.userForm,
      this.isClicked.value,
      controlName,
      errorName,
      notError
    );
  }

  getUsers(): void {
    const filters = this.filterForm.value;
    
    this.commonService.post(urlConstant.User.Get, filters).pipe(take(1)).subscribe((users: any) => {
      this.users.isLoading = false;
      
      if (users.status === 200) {
        this.users.data = users?.data || [];
        this.documents.patchValue(users?.documents || 0, { onlySelf: true });
      }
    }, () => {
      this.users.isLoading = false;
      this.users.data = [];
    });
  }

  submit(): void {
    this.isClicked.setValue(true);
    this.toastService.removeAll();

    if (this.userForm.invalid && this.isSubmited.value === false) {
      this.userForm.markAllAsTouched();
      this.toastService.error('Please enter valid values.');
      return;
    } else if (this.isSubmited.value === true) {
      this.toastService.info('Please wait your data proccing.');
      return;
    } else {
      this.isSubmited.setValue(true);

      const reqData = this.userForm.value;
      reqData.birthDate = new Date(reqData.birthDate.year, reqData.birthDate.month - 1, reqData.birthDate.day, 0, 0, 0, 0);
      
      this.commonService.insertOrUpdate(this._id.value ? urlConstant.User.Update : urlConstant.User.Insert, reqData).pipe(take(1)).subscribe((res) => {
        if (res.status === 200) {
          this.toastService.success(this._id.value ? 'User updated successfully.' : 'New user created successfully.');
          this.resetForm();
          this.getUsers();
        }
      }, (error) => {        
        this.toastService.error(error.message);
      }).add(() => {
        this.isSubmited.setValue(false);
      });
    }
  }

  editForm(user: any = {}): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.createForm(user);
  }

  deatailRecord(user: any = {}): void {
    const modalRef = this.ngbModal.open(UserDetailModalComponent, { size: 'xl', scrollable: true, modalDialogClass: 'modal-fullscreen-sm-down' });
    modalRef.componentInstance.user = user;
  }

  deleteRecord(id: string = ''): void {
    this.commonService.delete(urlConstant.User.Delete, id).pipe(take(1)).subscribe((res) => {
      if (res.status === 200) {
        this.toastService.success('User deleted successfully.');
        this.getUsers();
      }
    }, (error) => {        
      this.toastService.error(error.message);
    });
  }

  resetForm(validationFlag: boolean = false): void {
    this.userForm.reset();
    this.isClicked.setValue(validationFlag);
    this.isSubmited.setValue(false);

    if (validationFlag === true) {
      this.userForm.markAllAsTouched();
    }
  }

  addressAutoComplete(): void {
    if (!!this.shopAddressGoogleMap) {
      let autocomplete = new google.maps.places.Autocomplete(this.shopAddressGoogleMap.nativeElement);      
      
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.mapConfig.latitude = place.geometry.location.lat();
          this.mapConfig.longitude = place.geometry.location.lng();
          this.mapConfig.zoom = 15;
          this.shopLocation.setValue([this.mapConfig.longitude, this.mapConfig.latitude]);
          this.shopAddress.setValue(place.formatted_address);
          this.shopAddress.setErrors(null)
        });
      });
    }
  }

  markerDragEnd($event: any) {
    this.mapConfig.latitude = $event.latLng.lat();
    this.mapConfig.longitude = $event.latLng.lng();
    this.mapConfig.zoom = 15;
    this.shopLocation.setValue([this.mapConfig.longitude, this.mapConfig.latitude]);
    this.shopAddress.setErrors(null)
    this.getAddress(this.mapConfig.latitude, this.mapConfig.longitude);
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: string) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {   
          this.shopAddress.setValue(results[0].formatted_address);                 
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  applyDayValidation(): void {
    const dayCtrl = (<FormControl>this.userForm.get('birthDate.day'));
    const month = (<FormControl>this.userForm.get('birthDate.month')).value;
    const year = (<FormControl>this.userForm.get('birthDate.year')).value;
    const maxDays = this.daysInMonth(month, year);    

    if (dayCtrl.value > maxDays) {
      dayCtrl.setValue(maxDays);
    }

    this.birthDateOption.days = Globals.createArrayRange(1, maxDays);
  }

  daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  opneImgLightboxModal(url: string = ''): void {
    const modalRef = this.ngbModal.open(ImgLightboxModalComponent, { modalDialogClass: 'modal-fullscreen', scrollable: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.url = url;
  }

  trackById(index: number, item: any = {}) {
    return item._id
  }
}
