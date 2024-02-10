import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = []
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page:1,
            
        }

    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d2afd2ddf9ac4d6399e260456d25f8aa&${this.state.page}&pageSize=9`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles ,totalResults:parsedData.totalResults });
    }

    handlePrevious = async ()=>{
        this.state.page=this.state.page-1;
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d2afd2ddf9ac4d6399e260456d25f8aa&page=${this.state.page}&pageSize=9`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles ,totalResults:parsedData.totalResults });
        console.log(this.state.page);
        
    }

    handleNext =async ()=>{
        if(((this.state.page)*9) < this.state.totalResults){
        this.state.page=this.state.page+1;
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d2afd2ddf9ac4d6399e260456d25f8aa&page=${this.state.page}&pageSize=9`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles ,totalResults:parsedData.totalResults });
        console.log(this.state.page)
        }
    }
    render() {
        return (

            <div className="container my-3">
                <h2>Latest News Headlines</h2>
                <div className="row" >
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4 my-3" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 75) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>

                    })}
                </div>
                <div className="container d-flex justify-content-evenly my-5">
                <button type="button" disabled={this.state.page <=1} onClick={this.handlePrevious} className="btn btn-dark">&larr; Previous</button>
                <button type="button" onClick={this.handleNext} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
           
        )
    }
}

export default News
