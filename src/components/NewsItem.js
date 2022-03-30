import React from 'react'


const NewsItem =(props)=> {
 
      let {title,description,imageUrl,newsUrl,author,date}=props;
    return (
      <div className='my-3'>
        <div className="card" >
        
        <img src={!imageUrl?"https://feeds.abplive.com/onecms/images/uploaded-images/2022/03/24/dc81ee9709be649fc23f604676819373_original.jpg?impolicy=abp_cdn&imwidth=1200&imheight=628":imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title} <span className="badge bg-secondary">New</span></h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {!author? "Unknown": author} on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>

        
      </div>
    )

}

export default NewsItem
