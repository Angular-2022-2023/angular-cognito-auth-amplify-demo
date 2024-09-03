import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AmplifyAuthenticatorModule} from "@aws-amplify/ui-angular";
import {Amplify} from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_FwTusnQ9z',
      userPoolClientId: '3fuqlbjd309a5b2vue9eh0sqmf'
    }
  }
});
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
