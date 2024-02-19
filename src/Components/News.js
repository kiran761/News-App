import React, { useEffect, useState, useSyncExternalStore } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [page, setPgae] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [loadig, setLoading] = useState(true)
        // document.title = `${(props.category).toUpperCase()} - NewsMonster`
    

    const updateNews = async () => {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d2afd2ddf9ac4d6399e260456d25f8aa&page=${page}&pageSize=${props.pageSize} `;
        // setLoading(false);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(100);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);


    }
    useEffect(() => {
        updateNews();
    }, [])

    // const handlePrevious = () => {
    //     setPgae(page - 1)
    //     this.updateNews();
    // }

    // const handleNext = () => {
    //     setPgae(page + 1);
    //     updateNews();
    // }

   const fetchMoreData = async () => {
    setPgae(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d2afd2ddf9ac4d6399e260456d25f8aa&page=${page + 1}&pageSize=${props.pageSize} `;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    }

    return (
        <>

            <h2 className='text-center'>TOP {(props.category).toUpperCase()} HEADLINES</h2>
            {/* {this.state.loading && <Spinner />} */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row" >
                        { articles.map((element) => {
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
News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News
