import {Component, OnInit} from '@angular/core';
import {AuthService} from "../AuthService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'test-project';
  formFields = {
    signUp: {
      name: {
        order: 1
      },
      email: {
        order: 2
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
  };

  constructor(private authService: AuthService) {
  }
   ngOnInit(){
  //  let user = await this.authService.getCurrentUser();
  //  let session = await this.authService.getCurrentSession();
    this.authService.signOut();
//    console.log(user);
   // console.log(session?.idToken?.toString());
  }


}
