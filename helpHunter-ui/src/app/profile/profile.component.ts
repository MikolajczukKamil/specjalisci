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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  isEdit = false;
  isOn = false;

  public editData() {
    this.isEdit = true;
  }

  public cancel() {
    this.isEdit = false;
  }

  public save() {
    this.isEdit = false;
  }

  public swipeOnOff() {
    this.isOn = !this.isOn;
  }

}
