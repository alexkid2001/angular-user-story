import { Component, OnInit } from '@angular/core';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  regExp: RegExp = /^[a-zA-Z]{4}\d{7}$/;
  regExp1st: RegExp = /^[a-zA-Z]{0,4}$/;
  regExp2nd: RegExp = /^[a-zA-Z]{4}\d{1,7}$/;
  number = '';
  errorControlNumber: Boolean = false;
  errorNumber: Boolean = false;

  constructor(
    private storyService: StoryService
  ) {}


  checkNumber($event) {
    let value;
    value = $event.target.value.toUpperCase();
    $event.target.value = this.checkLastValue(value);

    this.number = $event.target.value;
  }

  checkLastValue(value) {
    if (value.length > 0 && value.length <= 4) {
      return this.regExp1st.test(value) ? value : this.checkLastValue(value.slice(0, -1));
    } else if (value.length > 4 && value.length < 11) {
      return this.regExp2nd.test(value) ?  value : this.checkLastValue(value.slice(0, -1));
    } else if (value.length >= 11) {
      return this.regExp.test(value) ? value : this.checkLastValue(value.slice(0, -1));
    } else {
      return '';
    }
  }

  checkControlNumber(code: string) {
    const arr = code.slice(0, -1).split('');
    const result = arr.reduce((sum, item, i) => sum + this.numEquiv(item) * (1 << i), 0);
    const mod = String(result % 11).slice(-1);
    return code[10] === mod;
  }

  numEquiv(char: string) {
    const num = parseInt(char, 36);
    return num > 30 ? num + 3 : num > 20 ? num + 2 : num > 10 ? num + 1 : num;
  }

  getInfo($event) {
    $event.preventDefault();
    this.errorControlNumber = !this.checkControlNumber(this.number);
    this.errorNumber =  !this.regExp.test(this.number);
    if (!this.errorControlNumber && !this.errorControlNumber) {
      this.getStory();
    }
  }

  getStory() {
    this.storyService.getData(this.number);
  }

  resetClick($event) {
    $event.preventDefault();
    this.storyService.stories = null;
    this.number = '';
    this.errorControlNumber = false;
    this.errorNumber = false;
  }

  ngOnInit() {
  }

}
