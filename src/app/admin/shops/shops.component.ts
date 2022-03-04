import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SlideInOut } from 'src/app/@shared/animations/slide-in-out.animation';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { Globals } from 'src/app/globals';
import { MapsAPILoader } from '@agm/core';
import { urlConstant } from 'src/app/@shared/constant/urlConstant';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { QrcodeComponent, NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  animations: [SlideInOut]
})
export class ShopsComponent implements OnInit {

  private addressGoogleMap!: ElementRef;
  @ViewChild('addressGoogleMap', { static: false }) set addressTextbox(addressTextbox: ElementRef) {
    if (addressTextbox) {
      this.addressGoogleMap = addressTextbox;
      this.addressAutoComplete();
    }
  }

  @ViewChild('shopQrCode') shopQrCode!: QrcodeComponent;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
  frontendUrl = environment.frontendUrl;

  shopForm!: FormGroup;
  filterForm!: FormGroup;
  isAddSectionOpen: boolean = false;
  shopTypes: string[] = [];
  mapConfig: any = {
    latitude: 0,
    longitude: 0,
    zoom: 12
  }
  shops: any = {
    data: [],
    isLoading: false
  };
  private geoCoder: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private commonService: CommonService
  ) {
    this.createForm();

    this.commonService.get(urlConstant.Shared.GetConstants).pipe(take(1)).subscribe((res: any) => {
      if (res.status === 200) {
        const constants = res?.data || {};
        this.shopTypes = constants?.shopTypes || [];
      }
    }, () => {
      this.shopTypes = [];
    });

    this.filterForm = this.formBuilder.group({
      search: [''],
      page: [1],
      documents: [0],
      perPage: [6]
    });

    this.filterForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((search: string) => {
      this.getShops();
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

    this.shops.isLoading = true;
    this.getShops();
  }

  createForm(defaultData: any = {}): void {
    if (defaultData?._id) {
      this.isAddSectionOpen = true;
    }

    this.shopForm = this.formBuilder.group({
      _id: [defaultData?._id || ''],
      name: [defaultData?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      type: [defaultData?.type || '', [Validators.required]],
      address: [defaultData?.address || '', [Validators.required, Validators.maxLength(300)]],
      location: [defaultData?.location?.coordinates || [], [Validators.required]],
      isClicked: [false],
      isSubmited: [false],
    });
  }

  get _id(): FormControl {
    return this.shopForm.get('_id') as FormControl;
  }

  get isClicked(): FormControl {
    return this.shopForm.get('isClicked') as FormControl;
  }

  get isSubmited(): FormControl {
    return this.shopForm.get('isSubmited') as FormControl;
  }

  get address(): FormControl {
    return this.shopForm.get('address') as FormControl;
  }

  get location(): FormControl {
    return this.shopForm.get('location') as FormControl;
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
      this.shopForm,
      this.isClicked.value,
      controlName,
      errorName,
      notError
    );
  }

  getShops(): void {
    const filters = this.filterForm.value;

    this.commonService.post(urlConstant.Shop.Get, filters).pipe(take(1)).subscribe((shops: any) => {
      this.shops.isLoading = false;

      if (shops.status === 200) {
        this.shops.data = shops?.data || [];
        this.documents.patchValue(shops?.documents || 0, { onlySelf: true });
      }
    }, () => {
      this.shops.isLoading = false;
      this.shops.data = [];
    });
  }

  submit(): void {
    this.isClicked.setValue(true);
    this.toastService.removeAll();

    if (this.location.invalid) {
      this.address.setErrors({ locationRequied: true })
    }

    if (this.shopForm.invalid && this.isSubmited.value === false) {
      this.shopForm.markAllAsTouched();
      this.toastService.error('Please enter valid values.');
      return;
    } else if (this.isSubmited.value === true) {
      this.toastService.info('Please wait your data proccing.');
      return;
    } else {
      this.isSubmited.setValue(true);

      const reqData = this.shopForm.value;

      this.commonService.insertOrUpdate(this._id.value ? urlConstant.Shop.Update : urlConstant.Shop.Insert, reqData).pipe(take(1)).subscribe((res) => {
        if (res.status === 200) {
          this.toastService.success(this._id.value ? 'Shop updated successfully.' : 'New shop created successfully.');
          this.resetForm();
          this.getShops();
        }
      }, (error) => {
        this.toastService.error(error.message);
      }).add(() => {
        this.isSubmited.setValue(false);
      });
    }
  }

  editForm(shop: any = {}): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.createForm(shop);
  }

  deleteRecord(id: string = ''): void {
    this.commonService.delete(urlConstant.Shop.Delete, id).pipe(take(1)).subscribe((res) => {
      if (res.status === 200) {
        this.toastService.success('Shop deleted successfully.');
        this.getShops();
      }
    }, (error) => {
      this.toastService.error(error.message);
    });
  }

  resetForm(validationFlag: boolean = false): void {
    this.shopForm.reset();
    this.isClicked.setValue(validationFlag);
    this.isSubmited.setValue(false);

    if (validationFlag === true) {
      this.shopForm.markAllAsTouched();
    }
  }

  addressAutoComplete(): void {
    if (!!this.addressGoogleMap) {
      let autocomplete = new google.maps.places.Autocomplete(this.addressGoogleMap.nativeElement);

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.mapConfig.latitude = place.geometry.location.lat();
          this.mapConfig.longitude = place.geometry.location.lng();
          this.mapConfig.zoom = 15;
          this.location.setValue([this.mapConfig.longitude, this.mapConfig.latitude]);
          this.address.setValue(place.formatted_address);
          this.address.setErrors(null)
        });
      });
    }
  }

  markerDragEnd($event: any) {
    this.mapConfig.latitude = $event.latLng.lat();
    this.mapConfig.longitude = $event.latLng.lng();
    this.mapConfig.zoom = 15;
    this.location.setValue([this.mapConfig.longitude, this.mapConfig.latitude]);
    this.address.setErrors(null)
    this.getAddress(this.mapConfig.latitude, this.mapConfig.longitude);
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: string) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.address.setValue(results[0].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  downloadShopQrCode(shop: any = {}): void {
    const qrEl = this.shopQrCode.qrcElement.nativeElement as HTMLDivElement;
    const base64Img = qrEl?.firstElementChild?.getAttribute('src') || '';

    if (base64Img) {
      const fileName = `${shop?.name}_${shop?.type}`;
      Globals.downloadBase64File(base64Img, fileName);      
    }
  }

  trackById(index: number, item: any = {}) {
    return item._id
  }
}
