import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description , imageUrl , newsUrl } = this.props
        return (

            <div>
                <div className="card">
                    <img  style={{ height:"16rem" , width :"100%" }} src={imageUrl?imageUrl:"https://st3.depositphotos.com/26913234/32605/v/450/depositphotos_326054804-stock-illustration-creative-modern-letter-news-clock.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target='_blank'  className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
