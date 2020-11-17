import React from 'react';
import {
  Link,
  // Route,
  // useRouteMatch
} from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Carousel
} from 'react-bootstrap';
import '../css/LinkList.css'
// import LinkDetail from './LinkDetail.js'
// static imports
import luigi from '../assets/luigi.jpg'
import daisy from '../assets/daisy.jpg'


class LinkList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
    }
  }

  async componentDidMount() {

    const response = await fetch('/api/links/', {
      method: 'GET',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log('data', data)
    this.setState({links: data})
  }

  render() {
    // console.log('render link list');
    return(
      <div className="list-page">
        <div className="carousel-container">
          <h1 className='page-title'>Your Notes</h1>
          <Carousel className='carousel' interval='8000' controls={true} indicators={false}>
            <Carousel.Item>
              <img className='d-block w-100' src={luigi} alt="luigi"/>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={daisy} alt="daisy"/>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className='list-container'>
          {this.state.links.map((link, index) => (
            <Link className='col-4 p-1' key={index} to={`/${this.props.username}/${link.id}`}>
              <div className='list-item '>
                <div className="img-container">
                  <img src={`https://img.youtube.com/vi/${link.youtube_ID}/0.jpg`} alt="#"/>
                </div>
                <div className="info">
                  <h2>{link.title}</h2>
                  <h3>{link.pub_date.substr(0,10)}</h3>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>

    )
  }
}

export default LinkList
