import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashBoardComponent } from './DashBoard/dash-board/dash-board.component';
import { DashBoardService } from './Services/DashBoardService';
import { MasterService } from './Services/masterService';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
    ,DashBoardComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,RouterModule.forRoot([])

  ],
  providers: [DashBoardService,MasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

