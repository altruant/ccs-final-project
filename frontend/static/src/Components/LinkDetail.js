import React from 'react';
import Youtube from 'react-youtube';
import { Link } from 'react-router-dom';
class LinkDetail extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      player: null
    }
    this.onReady=this.onReady.bind(this)
    this.seekToTime=this.seekToTime.bind(this)
  }

  onReady(event) {
    this.setState({player: event.target})
  }

  seekToTime(seconds) {
    this.state.player.seekTo(seconds)
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
    }
    return(
      <div className="container">
        <Youtube videoId={this.props.link.youtube_ID} opts={opts} onReady={this.onReady}/>
        <div className="title"><h3>{`${this.props.link.title}//${localStorage.getItem('username')}`}</h3></div>
        {this.props.link.comments.map((comment, index) => (
          <div key={index} className={`comment-${index}`} >
            <Link to={`${localStorage.getItem('username')}/your-links/${Math.round(comment.timestamp)}`} onClick={() => this.seekToTime(comment.timestamp)}>
              <span className="parsedStamp">{comment.parsedStamp}</span>
              <span className="body">{comment.body}</span>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}
export default LinkDetail
