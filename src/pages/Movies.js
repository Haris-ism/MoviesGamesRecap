import React, {Component} from "react"
import { Layout, Card } from 'antd'
import axios from "axios"
const {Content} = Layout

class Movies extends Component {
  constructor(props){
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount(){
    axios.get(`https://614fdbbda706cd00179b7317.mockapi.io/movies`)
    .then(res => {
      let movies = res.data.map(el=>{ return {
        id: el.id,
        description: el.description,
        duration: el.duration,
        genre: el.genre,
        image_url: el.image_url,
        rating: el.rating,
        review: el.review,
        title: el.title,
        year: el.year
      }})
      this.setState({movies})
    })
    .catch(err=>err.message)
  }

  render(){
    function truncateString(str, num) {
      if (str === undefined){
        return ""
      }else{
        if (str === null){
          return ""
        }else{
          if (str.length <= num) {
            return str
          }
          return str.slice(0, num) + '...'
        }
      }
    }
    const detail = (id) => {
      const { history } = this.props;
      if(history) {
        history.push(`/movie/${id}`)
      }
    }
    return (
      <>
        <Content
          className="site-layout-background"
          style={{
            padding: 0,
            margin: 0,
            minHeight: 280,
          }}
        >
        <h1 style={{"fontSize": "30px"}}>Popular Movies</h1>
        <div className="container"style={{display: "flex"}}>
          {
            this.state.movies.map((item)=>{
              return(
                <div className="cards" >
                  <Card onClick={()=>{ detail(item.id)}} value={item.id} hoverable="true" style={{"borderRadius": "15px"}} bodyStyle={{padding: "0px"}}>
                  <img  src={item.image_url} />
                  <label>{truncateString(item.title,23)}</label>
                  <br/>
                  <label>Genre: {truncateString(item.genre,20)}</label>
                  <br/>
                  <label>Year: {item.year}</label>
                  </Card>
                </div>
              )
            })
          }
          </div>
        </Content>
        </>
      )
    }
  }
export default Movies
