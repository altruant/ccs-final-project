import React from 'react';
import Youtube from 'react-youtube';
import Cookies from 'js-cookie';
// npm install --save-dev @iconify/react @iconify-icons/eva
import { Icon } from '@iconify/react';
import edit2Fill from '@iconify-icons/eva/edit-2-fill';
import trashFill from '@iconify-icons/eva/trash-fill';
import CommentForm from './CommentForm.js';



class LinkDetail extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      player: null,
      isEditing: false,
      comments: [],
      parsedStamp: '0s',
      timestamp: '0'
    }
    this.getTimestamp=this.getTimestamp.bind(this)
    this.getIDFomURL=this.getIDFomURL.bind(this)
    this.handleInput=this.handleInput.bind(this)
    this.handleSubInput=this.handleSubInput.bind(this)
    this.onReady=this.onReady.bind(this)
    this.seekToTime=this.seekToTime.bind(this)
    this.addComment = this.addComment.bind(this);
    this.removeComment=this.removeComment.bind(this);
    this.edit=this.edit.bind(this)
    this.updateLink=this.updateLink.bind(this)
  }


  componentDidMount() {
    fetch(`/api/links/${this.props.match.params.id}/`)
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => this.setState({...data}))
  }

  updateLink(event) {
    event.preventDefault();
    // console.log(this.state);
    // create a shallow copy of state object
    // remove property of player
    let newState = {...this.state}

    delete newState.player
    // console.log(newState)
    fetch(`/api/links/${this.props.match.params.id}/`, {
      method: 'PUT',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newState)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(this.setState({isEditing: !this.state.isEditing}))
  }

  getTimestamp(event) {
    const timestamp = event.target.getCurrentTime()
    const TIME = new Date(timestamp * 1000).toISOString().substr(11, 8)
    let finalTime
    if(timestamp<60) {
      finalTime = TIME.substr(6, 7) + 's'
    } else if (timestamp<600) {
      finalTime = TIME.substr(4,7)
    } else if (timestamp<3600) {
      finalTime = TIME.substr(3,7)
    }
    this.setState({parsedStamp: finalTime, timestamp: timestamp});
  }

  getIDFomURL() {
    let ID = this.YouTubeGetID(this.state.youtube_url)
    this.setState({youtube_ID: ID})
  }

  YouTubeGetID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
  }

  edit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubInput(event, index) {
    let comments = [...this.state.comments]
    comments[index].body = event.target.value
    this.setState(comments)
  }

  onReady(event) {
    this.setState({player: event.target})
  }

  seekToTime(seconds) {
    this.state.player.seekTo(seconds)
  }

  addComment(comment) {
    const comments = [...this.state.comments];
    comments.push(comment);
    this.setState({comments});
  }

  removeComment(index) {
    const comments = [...this.state.comments];
    comments.splice(index, 1);
    this.setState({comments});
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
    }
    return(
      <div className="container">
        <Youtube videoId={this.state.youtube_ID} opts={opts} onPause={this.getTimestamp} onReady={this.onReady}/>
        <div className={`info ${this.state.isEditing ? 'hidden': ''}`}>
          <div className="title">
            <h3>{`${this.state.title}//${localStorage.getItem('username')}`}</h3>
            <Icon onClick={this.edit} icon={edit2Fill} />
            <Icon icon={trashFill} />
          </div>
          {this.state.comments.map((comment, index) => (
            <div key={index}>
              <button onClick={() => this.seekToTime(comment.timestamp)}>
                <span>{comment.parsedStamp}</span>
                <span>{comment.body}</span>
              </button>
            </div>
          ))}
        </div>
        <div className={`editForm ${this.state.isEditing ? '': 'hidden'}`}>
          <form onSubmit={this.updateLink}>
            <div className='url-title'>
              <input type='url' value={this.state.youtube_url} onChange={this.handleInput} name='youtube_url' placeholder='Youtube URL'/>
              <input type="text" value={this.state.title} name='title' placeholder='Title'/>
              <button type='button' onClick={() => this.getIDFomURL()}>Update Youtube URL</button>
            </div>
            <div className="comments">
              {
                this.state.comments.map((comment, index) => (
                    <div key={index}>
                      <span>{comment.parsedStamp}</span>
                      <input type="text" name='body' onChange={(e) => this.handleSubInput(e, index)} value={comment.body}/>
                      <button type='button' onClick={() => this.removeComment()}>Remove</button>
                    </div>
                ))
              }
              <CommentForm
                className={`comment-form ${this.state.isEditing ? '': 'hidden'}`}
                addComment={this.addComment}
                timestamp={this.state.timestamp}
                parsedStamp={this.state.parsedStamp}
              />
            </div>
            <button type='submit'>Save</button>
          </form>
        </div>
      </div>
    )
  }
}
export default LinkDetail
