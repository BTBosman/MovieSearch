import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ProfileArr from '../../app/class';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  profile = [];
  movie_title;
  image;
  year;
  overview;

  constructor(private route: ActivatedRoute, private router: Router, public productdata: DatabaseService) { }

  ngOnInit() {
    this.profile = ProfileArr;
    console.log(this.profile)
    this.movie_title = this.profile[0].movie_title;
    this.image = this.profile[0].poster;
    this.year = this.profile[0].year
    this.overview = this.profile[0].overview;
  }

}
