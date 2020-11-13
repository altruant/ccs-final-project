import React, { useState, useEffect } from 'react';
import {
  Link,
  // Route,
  // useRouteMatch
} from 'react-router-dom';

// import LinkDetail from './LinkDetail.js'

export default function LinkList(props) {
  const [links, setLinks] = useState([])

  useEffect(() => {
      fetch('/api/links/')
        .then(results => results.json())
        .then(data => setLinks(data));
    }, []);
  //
  // const { url, path } = useRouteMatch()

  return(
    <div>
      {links.map((link, index) => (
        <div key={index}>
          <Link to={`${props.match.url}/${link.id}`}>
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
