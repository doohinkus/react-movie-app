import React, { Component } from 'react';
import Navigation  from './components/navbar';
import {ApiKey} from './api.key.js';
import CompanyListOptions from "./components/CompanyListOptions";
import Results from './components/results';

// context
const MovieContext = React.createContext();
// provider component
class MovieProvider extends Component {

  state = {
    company: '521',
    pages: 0,
    page: 1,
    showPagination: 0,
    companies:[
      {
        "name" : 'Dreamworks Animation SKG',
        "id" : '521'
      },
      {
        "name" : 'Twentieth Century Fox Film Corp.',
        "id": '25'
      },
      {
        "name" : 'Fox Searchlight Pictures',
        "id" : '43'},
      {
        "name": 'Fox 2000 Films',
        "id" : '711'
      },
      {
        "name": 'STX Entertainment',
        "id" : '47729'
      }
    ],
    message: "Hello, baby!!!"
  }
 getMovies(page){
     fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&with_companies=${this.state.company}&sort_by=popularity.desc&page=${page}&append_to_response=videos`)
     .then(response => response.json())
     .then(data => {
       // console.log(data)
       const movies = data.results.map(movie => {
         const image = movie.poster_path != null
         ?  (<img
            src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={`movie cover for ${movie.title}`}/>)
         : (<div><p>😞 😞 😞 </p><p>no image</p></div>)
         return (
           <div key={movie.id} className="row mb-3">
             <div className="col-md-4 text-center">
               {image}
             </div>
             <div className="col-md-8">
               <h3>{movie.title} ({movie.release_date ? movie.release_date.substring(0,4) : "No Date"})</h3>
               <p className="text-success">{this.state.companies.find(movie => movie.id===this.state.company).name}</p>
               <p>{movie.overview}</p>
             </div>
           </div>
         )
       })
       this.setState({
         movieList: movies,
         pages: data.total_pages
       });
     })
 }
 nextPage(){
   if (this.state.page < this.state.pages){
     this.setState({
       page: parseInt(this.state.page) + 1
     }, () => this.getMovies(this.state.page))
   }
   // console.log(this.state.page)
 }
 prevPage(){
   if (this.state.page > 1){
     this.setState({
       page: parseInt(this.state.page) - 1
     }, () => this.getMovies(this.state.page))
   }
   // console.log(this.state.page)
 }

  render(){
    return (
      <MovieContext.Provider value={{
          state: this.state,
          nextPage: () => {
            this.nextPage()
          },
          prevPage: () => {
            this.prevPage()
          },
          handleSelectChange: (e) => {
            // console.log(this.state.company);
            if(e.target.value != "null") this.setState({company: e.target.value, page: 1, showPagination: 1}, () => this.getMovies(1))
            else this.setState({showPagination: 0, movieList: []})
          }
        }}>
        {this.props.children}
      </MovieContext.Provider>
    )
  }
}

class App extends Component {

  render() {
    return (

      <MovieProvider>
        <Navigation />
        <div className="container w-80 pt-3">
          <MovieContext.Consumer>
            {(context) => (
              <React.Fragment>
                <CompanyListOptions
                  companies={context.state.companies}
                  action={context.handleSelectChange}>
                </CompanyListOptions>
                <div className={context.state.showPagination ? 'd-flex text-center' : 'd-none'}>
                  <a onClick={context.prevPage} className="mx-auto text-primary hand">Prev</a>
                  <p className="mx-auto">Page {context.state.page} of {context.state.pages}</p>
                  <a onClick={context.nextPage} className="mx-auto text-primary hand">Next</a>
                </div>
                {context.state.movieList}

              </React.Fragment>

            )}
          </MovieContext.Consumer>
        </div>
      </MovieProvider>
    );
  }
}

export default App;
