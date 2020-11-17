import React from 'react';
import Youtube from 'react-youtube';
import Cookies from 'js-cookie';
import '../css/LinkDetail.css'

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
    this.deleteMethod=this.deleteMethod.bind(this)
  }


  componentDidMount() {
    fetch(`/api/links/${this.props.match.params.id}/`)
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => this.setState({...data}))
  }

  async updateLink(event) {
    event.preventDefault();

    // create a shallow copy of state object
    // remove property of player
    let newState = {...this.state}
    delete newState.player
    console.log(newState)

    const response = await fetch(`/api/links/${this.props.match.params.id}/`, {
      method: 'PATCH',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.parse(JSON.stringify(newState)))
    })
    const data = await response.json()
    console.log(data)
    this.setState({isEditing: !this.state.isEditing})
  }

  deleteMethod() {
    fetch(`/api/links/${this.props.match.params.id}/`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // response.json()
        this.props.history.push(`/${localStorage.getItem('username')}/your-links`);
      })
      // .then(data => console.log(data))
      .catch(err => console.log('ERR', err))

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
      height: '438.75px',
      width: '100%',
    }
    return(
      <div className="container-fluid">
        <div className="link-detail">
          <div className="left-side col-12 col-lg-7">
            <div className={`youtube-container`}>
              <Youtube
                className='youtube-player'
                videoId={this.state.youtube_ID}
                opts={opts}
                onPause={this.getTimestamp}
                onReady={this.onReady}
              />

              <div className={`video-title`}>
                <h2>{`${this.state.title}`}</h2>
                <button type='button' className='button' onClick={() => this.toggleTitle()}>Edit</button>
              </div>
            </div>
            <div className={`url-title ${this.state.isEditing ? '': 'hidden'}`}>
              <div className="title-form">
                <input className='title-input' type="text" name='title' onChange={this.handleInput} value={this.state.title} placeholder='Title' maxlength='40'/>
                <input className='url-input' type="url" name='youtube_url' onChange={this.handleInput} value={this.state.youtube_url} placeholder='Youtube URL'/>
                <button class='button' disabled={!this.state.youtube_url} onClick={this.showForm}>{`${this.state.isCommenting ? 'Update': 'Continue'}`}</button>
              </div>
              </div>
          </div>
          <div className={`right-side ${this.state.isCommenting ? '': 'hidden'} col-lg-5`}>
            {
              this.state.comments.map((comment, index) => (

                  <div className='display-comment' key={index}>
                    <button type='button timestamp-button' className='button' onClick={() => this.seekToTime(comment.timestamp)}>
                      <div className="timestamp">
                        <span className='at'>@</span><span className='parsedStamp'>{comment.parsedStamp}</span>
                      </div>
                      <span className='body'>{comment.body}</span>
                    </button>
                    <button className='x-button' onClick={() => this.removeComment(index)}>
                      <span className="iconify x-icon" data-icon="octicon-x" data-inline="false"></span>
                    </button>
                    {/* <button type='button' onClick={() => this.removeComment(index)}>Remove</button> */}
                  </div>
              ))
            }
            <form onSubmit={(event) => this.props.submitLink(event, this.state)}>
              <CommentForm
                className={`comment-form`}
                addComment={this.addComment}
                timestamp={this.state.timestamp}
                parsedStamp={this.state.parsedStamp}
              />
              <button className='button save' type="submit">Save</button>
            </form>
          </div>
        </div>

        {/* <div className={`editForm ${this.state.isEditing ? '': 'hidden'}`}>
          <form onSubmit={this.updateLink}>
            <div className='url-title'>
              <input type='url' value={this.state.youtube_url} onChange={this.handleInput} name='youtube_url' placeholder='Youtube URL'/>
              <input type="text" value={this.state.title} onChange={this.handleInput} name='title' placeholder='Title'/>
              <button type='button' onClick={() => this.getIDFomURL()}>Update Youtube URL</button>
            </div>
            <div className="comments">
              {
                this.state.comments.map((comment, index) => (
                    <div key={index}>
                      <span>{comment.parsedStamp}</span>
                      <input type="text" name='body' onChange={(e) => this.handleSubInput(e, index)} value={comment.body}/>
                      <button type='button' onClick={() => this.removeComment(index)}>Remove</button>
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
        </div> */}
      </div>
    )
  }
}
export default LinkDetail