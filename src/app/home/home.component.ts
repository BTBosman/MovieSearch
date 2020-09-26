import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { obj } from '../../app/class';
import ProfileArr from '../../app/class';
import Swal from 'sweetalert2';


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
  moviesFound: Boolean;

  path = [];
  overview: any;

  constructor(public database: DatabaseService, public router: Router) { }

  ngOnInit() {
  }

  searchByTitle() {

    this.moviesFound = false;

    Swal.fire({
      title: 'Search For movie',
      input: 'text',
      showCancelButton: true,
      width: '50rem',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        else {

          this.database.searchMovieByTitle(value).then((data: any) => {
      console.log(data)
      this.movieList = data;
      let count = 0;

      Swal.fire({
        title: 'Movies found!',
        imageUrl: '/assets/logodd.png',
        imageWidth: 60,
        imageHeight: 40,
        width: '50rem',
        imageAlt: 'Custom image',
        showConfirmButton: false,
        timer: 1000
      });

      this.moviesFound = true;
  
      //  for(var x = 0;x < this.movieList.length;x++){
      //   this.path.push(this.baseUrl + this.movieList[x].poster_path);
      //   count++;
      //  }
      //  console.log(this.path)

    }).catch(error => {
     
      Swal.fire('Ooops..!',error);
    });

    

        }

        
      }
      
    })

    
    
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
