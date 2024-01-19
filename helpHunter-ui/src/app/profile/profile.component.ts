import {Component} from '@angular/core';
import {ButtonComponent} from "../components/button/button.component";
import {UserService} from "../services/user/user.service";
import {UserData} from "./user-data";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user?: UserData;
  srcAvatar?: string;
  static userToken: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    console.log(ProfileComponent.userToken)
    this.getUserData(ProfileComponent.userToken);
  }

  getUserData(token: string) {
    this.userService.getUserData(token).subscribe(
      (data) => {
        this.user = data;
        this.showAvatar(data.avatar)
        console.log(this.user);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  isEdit = false;

  public editData() {
    this.isEdit = true;
  }

  public cancel() {
    this.isEdit = false;
  }

  public save() {
    this.isEdit = false;
  }

  public showAvatar(avatarId: number) {
    switch (avatarId) {
      case 1: return this.srcAvatar = './assets/images/avatars/avatar1.png';
      case 2: return this.srcAvatar = './assets/images/avatars/avatar2.png';
      case 3: return this.srcAvatar = './assets/images/avatars/avatar3.png';
      case 4: return this.srcAvatar = './assets/images/avatars/avatar4.png';
      case 5: return this.srcAvatar = './assets/images/avatars/avatar5.png';
      default: return this.srcAvatar = '0';
    }
  }

}
