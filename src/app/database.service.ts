import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  movieList = new Array();
  image;
  defaultImage = '/assets/logodd.png';

  title;
  baseUrl = "http://image.tmdb.org/t/p/w185";

  constructor(public http: HttpClient) { }

  searchMovieByTitle(title) {
    this.movieList = []
    // let url = 'http://www.omdbapi.com/?s='+ title +'&type=movie&apikey=77770a81'
    let url = "https://api.themoviedb.org/3/search/movie?api_key=117f54097dfabfd264cb7912b442bc7c&language=en-US&page=1&include_adult=false&query=" + title;
    return new Promise((accept, reject) => {

      this.http.get(url).subscribe((data: any) => {
        if (data.Error) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: data.Error,

          })
        }
        var details = data.results
        console.log(details.length);
        for (var x = 0; x < details.length; x++) {
          let index = data.results[x];
          if (index.poster_path == null || index.poster_path == undefined) {
            this.image = this.defaultImage;
          }
          else {
            this.image = this.baseUrl + index.poster_path
          }
          let obj = {
            title: index.title,
            overview: index.overview,
            backdrop_path: this.baseUrl + index.backdrop_path,
            release_date: index.release_date,
            popularity: index.popularity,
            poster_path: this.image,
            video: index.video,
          }
          this.movieList.push(obj);
        }
        if (this.movieList.length > 0) {
          accept(this.movieList)
        }
        else {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: "We could not find any results for that search.",
          })

        }
        console.log(this.movieList);
      }, err => {
        console.log(err);
      });
    }
    )
  }
  searchMoviebyYear(year) {
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=117f54097dfabfd264cb7912b442bc7c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=' + year;
  }

  getMovieByName(title) {
    let url = "https://api.themoviedb.org/3/movie/550?api_key=117f54097dfabfd264cb7912b442bc7c";

    return new Promise((accept, reject) => {
      this.http.get(url).subscribe(data => {
        accept(data);
        console.log(data);
      }, (error => {
        reject(error);
        console.log(error);
      }))
    })
  }

  favoriteMovies(item) {
    this.movieList.push(item)
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Your movie has been added to favourites',
      showConfirmButton: false,
      timer: 1500
    })
  }


}
