import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:6,
        category:'general'
    }

    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1,
        }
    }

    async componentDidMount() {
        this.setState({loading:true});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults,loading :false})
    }

    handleNextClick=async ()=>{
        this.setState({loading:true});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles,
        page:this.state.page+1,
        loading :false
        })
    }

    handleprevClick=async ()=>{
        this.setState({loading:true});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4bd810b72624b0cb0a5e0a42fdc8dad&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles,
        page:this.state.page-1,
        loading :false
        })
    }
    render() {
        return (
            <div className='container my-2'>
                <h2 className='text-center my-4'>NEWSIFY-Your today's headlines</h2>
                {this.state.loading && <Loading/>}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} newsUrl={element.url} imageUrl={element.urlToImage} />
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                <button type="button" disabled={this.state.page<=1} onClick={this.handleprevClick} className="btn btn-primary">&laquo; Previous</button>
                <button type="button" disabled={this.state.page>=this.state.totalResults/this.props.pageSize} onClick={this.handleNextClick} className="btn btn-primary">Next &raquo;</button>
                </div>
            </div>
        )
    }
}

export default News