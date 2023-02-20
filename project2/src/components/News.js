import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const[articles,setArticles]=useState([])
    const[loading,setloading]=useState(true)
    const[page,setPage]=useState(1)
    const[totalResults,setTotalResults]=useState(0)
    

    const updateNews=async()=> {
        props.setProgress(10);
        setloading(true)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(20);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setloading(false)
        props.setProgress(100);
    }
    useEffect(() => {
        updateNews();
        document.title = `${props.category}- Newsify`
        // eslint-disable-next-line 
    }, [])

    // handleNextClick = async () => {
    //     // this.setState({Loading:true});
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({ articles: parsedData.articles,
    //     // page:this.state.page+1,
    //     // Loading :false
    //     // })

    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();

    // }

    // handleprevClick = async () => {
    //     // this.setState({Loading:true});
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // this.setState({ articles: parsedData.articles,
    //     // page:this.state.page-1,
    //     // Loading :false
    //     // })

    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };


        return (
            <>
                <h2 className='text-center' style={{margin:'90px 0 30px 0'}}>NEWSIFY-Your today's headlines</h2>
                {loading && <Loading/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Loading />}>
                    <div className="container">
                        <div className='row'>
                            {!loading && articles.map((element) => {
                                return <div className='col-md-4' key={element.url}>
                                    <Newsitem title={element.title ? element.title : ""} author={element.author ? element.author : 'unknown'} source={element.source.name} date={element.publishedAt} description={element.description ? element.description : ""} newsUrl={element.url} imageUrl={element.urlToImage} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handleprevClick} className="btn btn-primary">&laquo; Previous</button>
                    <button type="button" disabled={this.state.page >= this.state.totalResults / props.pageSize} onClick={this.handleNextClick} className="btn btn-primary">Next &raquo;</button>
                </div> */}
            </>
        )
    }


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: ''
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News