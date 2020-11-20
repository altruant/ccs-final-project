  //imports
import React from 'react';
import {
  Carousel
} from 'react-bootstrap';
import {
  Link,
} from 'react-router-dom';
import Youtube from 'react-youtube';
import CommentDetail from './CommentDetail.js'
import CommentForm from './CommentForm.js';
import '../css/LinkForm.css'
// assets
import incin from '../assets/incin.jpg';
import darksamus from '../assets/darksamus.jpg';
import ken from '../assets/ken.jpg';
import bayo from '../assets/bayo.jpg';



class LinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      youtube_url: 'https://www.youtube.com/watch?v=6DjjGii5Z80',
      title: '',
      comments: [],
      isCommenting: false,
      isEditing: true,
      isOwner: true,
      youtube_ID: '',
      timestamp: '0',
      parsedStamp: '0s',
      commentId: '',
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
    this.updateComment=this.updateComment.bind(this);
  }

  getTimestamp(event) {
    const timestamp = event.target.getCurrentTime();
    const TIME = new Date(timestamp * 1000).toISOString().substr(11, 8);
    let finalTime;
    if(timestamp<10) {
      finalTime = TIME.substr(7) + 's';
    } else if (timestamp<60) {
      finalTime = TIME.substr(6, 7) + 's';
    } else if (timestamp<600) {
      finalTime = TIME.substr(4,7);
    } else if (timestamp<3600) {
      finalTime = TIME.substr(3,7);
    }
    this.setState({parsedStamp: finalTime, timestamp: timestamp});
  }

  // componentDidMount() {
  //   this.setState({username: localStorage.getItem('username')})
  // }

  YouTubeGetID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    console.log(url)
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

  updateComment(comment, newBody) {
    const comments = [...this.state.comments];
    const index = comments.indexOf(comment);
    comments[index].body = newBody;
    this.setState({comments});
  }

  render() {
    let formConditional
    const opts = {
      width: '100%',
      playsinline: '1',
    }
    if(localStorage.getItem('login')===null) {
      formConditional =
      <>
      <div className="landing-message">
        <h2>
          You are not logged-in, to create a new Note:
        </h2>
        <Link to='/login-form'>
          Login
        </Link>
      </div>
      </>
    } else {
      formConditional =
        <>
        <div className="form">
          <div className="left-side col-12 col-lg-7">
            <div className={`youtube-container ${this.state.isCommenting ? '': 'hidden'}`}>
              <div className={`iframe-container`}>
                <Youtube
                  className='youtube-player'
                  videoId={this.state.youtube_ID}
                  onPause={this.getTimestamp}
                  onReady={this.onReady}
                  isEditing={this.state.isEditing}
                  isOwner={this.state.isOwner}
                  opts={opts}
                />
                </div>
                <div className={`video-title ${this.state.isCommenting ? '' : 'hidden'} ${this.state.isEditing ? 'hidden': ''} `}>
                  <h2>{`${this.state.title}`}</h2>
                  <button type='button' className='button' onClick={() => this.toggleTitle()}>Edit</button>
                </div>
            </div>
            <div className={`url-title ${this.state.isEditing ? '': 'hidden'}`}>
              <div className="title-form">
                <input className='title-input col-12' type="text" name='title' onChange={this.handleInput} value={this.state.title} placeholder='Title' maxLength='40'/>
                <input className={`url-input col-12 ${this.state.isCommenting ? 'hidden': ''}`} type="url" name='youtube_url' onChange={this.handleInput} value={this.state.youtube_url} placeholder='Youtube URL' maxLength='100'/>
              </div>
              <button class='button' disabled={!this.state.youtube_url} onClick={this.showForm}>{`${this.state.isCommenting ? 'Update': 'Continue'}`}</button>
              </div>
          </div>
          <div className={`right-side ${this.state.isCommenting ? '': 'hidden'} col-lg-5`}>
            {
              this.state.comments.map((comment, index) => (
                <CommentDetail
                updateComment={this.updateComment}
                comment={comment}
                isEditing={this.state.isEditing}
                isOwner={this.state.isOwner}
                index={index}
                seekToTime={this.seekToTime}
                removeComment={this.removeComment}
                />
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


        </>
    }
    return(
      <div className='linkform container-fluid'>
        <div className={`carousel-container ${this.state.isCommenting ? 'hidden': ''}`}>
          <h1 className={`page-title ${this.state.isCommenting ? 'hidden': ''}`}>Create</h1>
          <Carousel className='carousel' interval='8000' controls={false} indicators={false}>
            <Carousel.Item>
              <img className='d-block' src={bayo} alt="bayo"/>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block' src={incin} alt="incin"/>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block' src={darksamus} alt="dsamus"/>
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block' src={ken} alt="ken"/>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="form-container container-fluid;">
          {formConditional}
        </div>
      </div>
    )
  }
}

export default LinkForm
