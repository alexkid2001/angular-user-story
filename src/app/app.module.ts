import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoryService } from './story.service';
import { StoryComponent } from './story/story.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    SearchPanelComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    StoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
