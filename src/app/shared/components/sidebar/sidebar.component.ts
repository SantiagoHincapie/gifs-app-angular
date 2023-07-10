import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private _gifsServices: GifsService) {}

  get tags() {
    return this._gifsServices.tagsHistory;
  }

  search(tag:string):void{
    this._gifsServices.searchTag(tag)
  }
}
