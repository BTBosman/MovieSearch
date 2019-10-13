import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { obj } from '../../app/class';
import ProfileArr from '../../app/class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movieList = [];
  page: string = 'home';
  modal;
  graph: string;
  obj = {} as obj;
  ProfileArr = ProfileArr;
  poster: string;
  movie_title: string;
  type: string;
  year: string;

  path = [];
  overview: any;

  constructor(public database: DatabaseService, public router: Router) { }

  ngOnInit() {
  }

  searchByTitle(movieName) {
    this.database.searchMovieByTitle(movieName).then((data: any) => {
      console.log(data)
      this.movieList = data;
      console.log(this.movieList);
      let count = 0;
      console.log(this.movieList.length)
      //  for(var x = 0;x < this.movieList.length;x++){
      //   this.path.push(this.baseUrl + this.movieList[x].poster_path);
      //   count++;
      //  }
      //  console.log(this.path)

    }).catch(error => {
      console.log("movie not found or results to large", error)
    });
  }


  view(x) {
    console.log(x)
    this.poster = x.poster_path;
    this.movie_title = x.title;
    this.overview = x.overview;
    this.year = x.release_date;
  }

  productDetails() {

    let obj = {
      poster: this.poster,
      movie_title: this.movie_title,
      overview: this.overview,
      year: this.year
    }

    ProfileArr[0] = (obj);
    console.log(ProfileArr)
    console.log(obj)

    this.router.navigate(['/details', { obj: obj }]);
  }

}
