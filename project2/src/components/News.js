import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category}- Newsify`
    }

    async updateNews() {
        this.props.setProgress(10);
        this.setState({ loading: true });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(20);
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults
        })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.updateNews();
    }

    // handleNextClick = async () => {
    //     // this.setState({loading:true});
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({ articles: parsedData.articles,
    //     // page:this.state.page+1,
    //     // loading :false
    //     // })

    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();

    // }

    // handleprevClick = async () => {
    //     // this.setState({loading:true});
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // this.setState({ articles: parsedData.articles,
    //     // page:this.state.page-1,
    //     // loading :false
    //     // })

    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <h2 className='text-center my-4'>NEWSIFY-Your today's headlines</h2>
                {this.state.loading && <Loading/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loading />}>
                    <div className="container">
                        <div className='row'>
                            {!this.state.loading && this.state.articles.map((element) => {
                                return <div className='col-md-4' key={element.url}>
                                    <Newsitem title={element.title ? element.title : ""} author={element.author ? element.author : 'unknown'} source={element.source.name} date={element.publishedAt} description={element.description ? element.description : ""} newsUrl={element.url} imageUrl={element.urlToImage} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handleprevClick} className="btn btn-primary">&laquo; Previous</button>
                    <button type="button" disabled={this.state.page >= this.state.totalResults / this.props.pageSize} onClick={this.handleNextClick} className="btn btn-primary">Next &raquo;</button>
                </div> */}
            </>
        )
    }
}

export default News