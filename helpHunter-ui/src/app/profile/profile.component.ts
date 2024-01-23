import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserData } from './user-data';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
    user?: UserData;
    static userToken: string;
    fullnameInput!: string;
    phonenumberInput!: string;
    emailInput!: string;
    locationInput!: string;
    descriptionInput!: string;
    avatarInput!: number | undefined;

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getUserData(ProfileComponent.userToken);
    }

    getUserData(token: string) {
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
            isprovidingservice: true,
            latitude: this.user?.latitude,
            location: locationInput,
            longitude: this.user?.longitude,
            phonenumber: phonenumberInput,
            username: this.user?.username,
        };
        // @ts-ignore
        this.setDefaultValueOfInputs(this.user);
        // @ts-ignore
        this.userService.updateUserData(newData).subscribe();
        this.isEdit = false;
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
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
}
