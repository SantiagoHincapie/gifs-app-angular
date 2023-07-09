import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = '00vbfv3zAHbyrWRdIL3F7ldIohLQcn6V';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs/search';

  constructor(private http: HttpClient) {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  searchTag(newTag: string): void {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', newTag);

    if (newTag.length === 0) return;
    this.organizeHistory(newTag);
    this.http
      .get<SearchResponse>(`${this.serviceURL}`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;

        console.log({ gifs: this.gifList });
      });
    //console.log(this.tagsHistory);
    //fetch('https://api.giphy.com/v1/gifs/search?api_key=00vbfv3zAHbyrWRdIL3F7ldIohLQcn6V&q=valoran&limit=10')
  }
}
