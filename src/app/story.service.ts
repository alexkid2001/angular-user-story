import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';


@Injectable()

export class StoryService {

  stories: object;

  constructor(
    private http: HttpClient,
  ) { }

  private storyUrl = 'http://www.mocky.io/v2/5ddbad8a3400005200eadd4a;';

  getStory(url): Observable<any> {
    return this.http.get(url);
  }

  getData(number: string) {
    const url = `${this.storyUrl}?number=${number}`;
    this.getStory(url)
      .subscribe(data => {
        this.stories = data.history;
        console.log(this.stories);
      });
  }
}
