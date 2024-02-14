import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            // loading: false,
            page: 1,
            totalResults: 0,

        }
        document.title = `${(this.props.category).toUpperCase()} - NewsMonster`
    }

    async updateNews() {
        this.props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2afd2ddf9ac4d6399e260456d25f8aa&page=${this.state.page}&pageSize=${this.props.pageSize} `;
        // this.setState({ loading: false });
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(100);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });

    }
    async componentDidMount() {
        this.updateNews();
    }

    // handlePrevious = () => {
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    // handleNext = () => {
    //     this.setState({ page: ++this.state.page });
    //     this.updateNews();
    // }

    fetchMoreData =async ()=>{
        this.setState({page:this.state.page+1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2afd2ddf9ac4d6399e260456d25f8aa&page=${this.state.page +1}&pageSize=${this.props.pageSize} `;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults });
    }
    render() {

        return (
            <>

                <h2 className='text-center'>TOP {(this.props.category).toUpperCase()} HEADLINES</h2>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults }
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row" >
                            {!this.state.loading && this.state.articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 75) : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                                </div>

                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
    }
}

export default News
