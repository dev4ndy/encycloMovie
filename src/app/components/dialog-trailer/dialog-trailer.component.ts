import { constants } from './../../global/constants.global';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Video } from '../../models/video.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-trailer',
  templateUrl: './dialog-trailer.component.html',
  styleUrls: ['./dialog-trailer.component.css']
})
export class DialogTrailerComponent implements OnInit {

  url: string = '';
  key: string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogTrailerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private movieService: MovieService,
    private sanitization: DomSanitizer,
  ) { }

  ngOnInit() {
    const videos = this.data.videos;
    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      if (video.type == constants.VIDEO_TYPE_TRAILER) {
        this.key = video.key;
        break;
      }
    }
    this.url = `https://www.youtube.com/embed/${this.key}?rel=0&amp;controls=0&amp;showinfo=0`
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  getVideoUrl() {
    return this.sanitization.bypassSecurityTrustResourceUrl(this.url);
  }

}
