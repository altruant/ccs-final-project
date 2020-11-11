import React from 'react';
import {
  Link,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import LinkDetail from './LinkDetail.js'

class LinkList extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      links: [],
    }
  }
  componentDidMount() {
    fetch('/api/links/')
      .then(response => response.json())
      .then(data => this.setState({links: data}))
      .catch(err => console.log('Error', err))
  }
  render() {
    return(
      <div>
        {this.state.links.map((link, index) => (
          <div key={index}>
            <Link to={`/${localStorage.getItem('username')}/your-links/${link.id}`}>
              <div className={`list-item-${index}`}>
                <img src={`https://img.youtube.com/vi/${link.youtube_ID}/0.jpg`} alt="#"/>
                {link.title}
              </div>
            </Link>
            <Switch>
              <Route path={`/${localStorage.getItem('username')}/your-links/${link.id}`}>
                <LinkDetail link={link} />
              </Route>
            </Switch>
          </div>

        ))}
      </div>

    )
  }
}

export default withRouter(LinkList)
