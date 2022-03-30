import React, {useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useLayoutEffect } from 'react/cjs/react.production.min';


const News=(props)=> {
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0);
 
  const capitalize=(str)=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
 
 const updateNews=async()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data =await fetch(url);
    setLoading(true);
    props.setProgress(30);
    let parsedData= await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
    props.setProgress(100);
  }
  useEffect(()=>{
     document.title=`${capitalize(props.category)} - NewsRabbit`;
    updateNews();
  },[])

  const fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data =await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    
  };
  
    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>NewsRabbit - Top {capitalize(props.category)} Headlines</h1>
       { loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="container">
        <div className='row'>
         {  articles.map((element)=>{
              return <div className='col-md-4' key={element.url}>
               <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                   </div>   
          })}
        </div>
        </div>           
        </div>
        </InfiniteScroll>
       
      </>
    )
  
}
News.defaultProps={
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes={
  country: PropTypes.string,
  pageSize:  PropTypes.number,
}
export default News
