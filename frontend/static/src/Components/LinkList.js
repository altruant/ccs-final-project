import React from 'react';
import {
  Link,
  // Route,
  // useRouteMatch
} from 'react-router-dom';
import Cookies from 'js-cookie';
// import LinkDetail from './LinkDetail.js'


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
    console.log('render link list');
    return(
      <div>
        {this.state.links.map((link, index) => (
          <div key={index}>
            <Link to={`/${this.props.username}/${link.id}`}>
              <div className={`list-item-${index}`}>
                <img src={`https://img.youtube.com/vi/${link.youtube_ID}/0.jpg`} alt="#"/>
                {link.title}
              </div>
            </Link>

          </div>
        ))}

      </div>
    )
  }
}

export default LinkList
