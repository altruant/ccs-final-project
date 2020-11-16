//imports
import React from 'react';
import {
  Carousel
} from 'react-bootstrap';
import Youtube from 'react-youtube';
import CommentForm from './CommentForm.js';
// assets
import incin from '../assets/incin.jpg';
import darksamus from '../assets/darksamus.jpg';
import ken from '../assets/ken.jpg';
import bayo from '../assets/bayo.jpg';



class LinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      youtube_url: 'https://www.youtube.com/watch?v=m6CrWBOxecY',
      title: 'mkleo',
      comments: [],
      isCommenting: false,
      isEditing: false,
      youtube_ID: '',
      timestamp: '0',
      parsedStamp: '0s',
      // username: '',

    }
    this.handleInput=this.handleInput.bind(this);
    this.addComment = this.addComment.bind(this);
    this.showForm=this.showForm.bind(this);
    this.removeComment=this.removeComment.bind(this);
    this.getTimestamp=this.getTimestamp.bind(this);
    this.toggleTitle=this.toggleTitle.bind(this);
    this.seekToTime=this.seekToTime.bind(this);
    this.onReady=this.onReady.bind(this);
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

  // componentDidMount() {
  //   this.setState({username: localStorage.getItem('username')})
  // }

  YouTubeGetID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
  }

  onReady(event) {
    this.setState({player: event.target})
  }

  seekToTime(seconds) {
    this.state.player.seekTo(seconds)
  }

  toggleTitle() {
    this.setState({isEditing: !this.state.isEditing})
  }

  showForm() {
    this.setState({isCommenting: true})
    this.setState({isEditing: !this.state.isEditing})
    let ID = this.YouTubeGetID(this.state.youtube_url)
    this.setState({youtube_ID: ID})
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

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {

    let formConditional
    const opts = {
      height: '438.75px',
      width: '100%',
    }
    if(localStorage.getItem('login')===null) {
      formConditional =
      <>
        <span>Login to create a new Link</span>
      </>
    } else {
      formConditional =
        <>
        <div className="form">
          <div className="left-side col-12 col-lg-7">
            <div className={`youtube-container ${this.state.isCommenting ? '': 'hidden'}`}>
              <Youtube
                className='youtube-player'
                videoId={this.state.youtube_ID}
                opts={opts}
                onPause={this.getTimestamp}
                onReady={this.onReady}
              />

              <div className={`video-title ${this.state.isCommenting ? '' : 'hidden'} `}>
                <h2>{`${this.state.title}`}</h2>
                <button type='button' className='button' onClick={() => this.toggleTitle()}>Edit</button>
              </div>
            </div>
            <div className={`url-title ${this.state.isEditing ? 'hidden': ''}`}>
              <div className="title-form">
                <input className='title-input' type="text" name='title' onChange={this.handleInput} value={this.state.title} placeholder='Title' maxlength='40'/>
                <input className='url-input' type="url" name='youtube_url' onChange={this.handleInput} value={this.state.youtube_url} placeholder='Youtube URL'/>
                <button class='button' disabled={!this.state.youtube_url} onClick={this.showForm}>{`${this.state.isEditing ? 'Update': 'Continue'}`}</button>
              </div>
              </div>
          </div>
          <div className={`right-side ${this.state.isCommenting ? '': 'hidden'} col-lg-5`}>
            <form onSubmit={(event) => this.props.submitLink(event, this.state)}>
              {
                this.state.comments.map((comment, index) => (

                    <div className='display-comment' key={index}>
                      <button type='button' className='timestamp-button' onClick={() => this.seekToTime(comment.timestamp)}>
                        <span className='parsed-stamp'>{comment.parsedStamp}</span>
                        <span className='comment-body'>{comment.body}</span>
                      </button>

                      <button type='button' onClick={() => this.removeComment(index)}>Remove</button>
                    </div>
                ))
              }
              <CommentForm
                className={`comment-form`}
                addComment={this.addComment}
                timestamp={this.state.timestamp}
                parsedStamp={this.state.parsedStamp}
              />
              <button className='button' type="submit">Save</button>
            </form>
          </div>
        </div>


        </>
    }
    return(
      <div className='linkform container-fluid'>
        <div className={`carousel-container ${this.state.isCommenting ? 'hidden': ''}`}>
          <h1 className='page-title'>Create</h1>
          <Carousel className='carousel' interval='8000' controls={false} indicators={false}>
            <Carousel.Item>
              <img className='d-block w-100' src={bayo} alt="bayo"/>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={incin} alt="incin"/>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={darksamus} alt="dsamus"/>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={ken} alt="ken"/>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="form-container">
          {formConditional}
        </div>
      </div>
    )
  }
}

export default LinkForm
