import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserData } from './user-data';
import { Router } from '@angular/router';
import {Subject, takeUntil} from "rxjs";
import {DeviceSizeService} from "../services/deviceSize/device-size.service";
import {NavigationMode} from "../home/home.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user?: UserData;
  fullnameInput!: string;
  phonenumberInput!: string;
  emailInput!: string;
  locationInput!: string;
  descriptionInput!: string;
  avatarInput!: number | undefined;
  booleanValue?: boolean;

  public shouldShowImage1 = false;
  public shouldShowImage2 = false;
  public shouldShowImage3 = false;
  public shouldShowImage4 = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserData().subscribe(data => {
      this.user = data;
      this.avatarInput = data.avatar;
      this.setDefaultValueOfInputs(data);
    });
  }

  setDefaultValueOfInputs(user: UserData) {
    this.fullnameInput = user.fullname;
    this.phonenumberInput = user.phonenumber;
    this.emailInput = user.email;
    this.locationInput = user.location;
    this.descriptionInput = user.description;
  }

  isEdit = false;

  public editData() {
    this.isEdit = true;
  }

  public cancel() {
    this.isEdit = false;
  }

  handleToggleChange(toggleState: boolean) {
    this.booleanValue = toggleState;
  }

  public save(
    fullnameInput: string,
    phonenumberInput: string,
    emailInput: string,
    locationInput: string,
    descriptionInput: string
  ) {
    let newData = {
      avatar: this.avatarInput,
      birthdate: this.user?.birthdate,
      description: descriptionInput,
      email: emailInput,
      fullname: fullnameInput,
      id: this.user?.id,
      IsProvidingServices: this.booleanValue,
      latitude: this.user?.latitude,
      location: locationInput,
      longitude: this.user?.longitude,
      phonenumber: phonenumberInput,
      username: this.user?.username,
    };
    console.log(this.booleanValue);
    // @ts-ignore
    this.setDefaultValueOfInputs(this.user);
    // @ts-ignore
    this.userService.updateUserData(newData).subscribe();
    this.isEdit = false;
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  setAvatar(avatar: number) {
    if (avatar != null) {
      this.avatarInput = avatar;
    } else {
      this.avatarInput = this.user?.avatar;
    }
  }

  getImageUrls1(): string {
    return './assets/images/avatars/avatar1.png';
  }

  getImageUrls2(): string {
    return './assets/images/avatars/avatar2.png';
  }

  getImageUrls3(): string {
    return './assets/images/avatars/avatar3.png';
  }

  getImageUrls4(): string {
    return './assets/images/avatars/avatar4.png';
  }

  choseImage1() {
    this.shouldShowImage1 = true;
    this.shouldShowImage2 = false;
    this.shouldShowImage3 = false;
    this.shouldShowImage4 = false;
    this.setAvatar(1);
  }
  choseImage2() {
    this.shouldShowImage1 = false;
    this.shouldShowImage2 = true;
    this.shouldShowImage3 = false;
    this.shouldShowImage4 = false;
    this.setAvatar(2);
  }
  choseImage3() {
    this.shouldShowImage1 = false;
    this.shouldShowImage2 = false;
    this.shouldShowImage3 = true;
    this.shouldShowImage4 = false;
    this.setAvatar(3);
  }
  choseImage4() {
    this.shouldShowImage1 = false;
    this.shouldShowImage2 = false;
    this.shouldShowImage3 = false;
    this.shouldShowImage4 = true;
    this.setAvatar(4);
  }
}
