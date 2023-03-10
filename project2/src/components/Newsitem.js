import React from 'react'

const Newsitem=(props)=>{
        let { title, description, imageUrl, newsUrl, author, date, source } =props;
        return (
            <div className='my-3'>
                <div className="card " >
                    <div>
                    <span className=" badge rounded-pill bg-danger" style={{display:'flex',position:'absolute',right:0}}>
                        {source}
                    </span></div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'>-by {author} on {new Date(date).toGMTString()}</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div></div>
        )
    }

export default Newsitem;