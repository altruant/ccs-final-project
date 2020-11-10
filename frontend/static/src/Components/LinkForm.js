import React from 'react';
import Cookies from 'js-cookie'
import Youtube from 'react-youtube';
import CommentForm from './CommentForm.js';



class LinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      youtube_url: '',
      title: '',
      comments: [],
      isCommenting: false,
      isEditing: true,
      youtube_ID: '',
      timestamp: '0',
      parsedStamp: '0s',
      // username: '',

    }
    this.handleInput=this.handleInput.bind(this);
    this.addComment = this.addComment.bind(this);
    this.submitLink=this.submitLink.bind(this);
    this.showForm=this.showForm.bind(this);
    this.removeComment=this.removeComment.bind(this);
    this.getTimestamp=this.getTimestamp.bind(this);
    this.toggleTitle=this.toggleTitle.bind(this);
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

  toggleTitle() {
    this.setState({isEditing: !this.state.isEditing})
  }

  showForm() {
    this.setState({isCommenting: true})
    let ID = this.YouTubeGetID(this.state.youtube_url)
    this.setState({youtube_ID: ID})
    if(this.state.isEditing === true) {
      this.toggleTitle()
    }
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

  async submitLink(event) {
    event.preventDefault()
    const response = await fetch('/api/links/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    const data = await response.json()
    console.log('Response', data)
  }

  render() {

    let formConditional
    const opts = {
      height: '390',
      width: '640',
    }
    if(localStorage.getItem('login')===null) {
      formConditional =
      <>
        <span>Login to create a new Link</span>
      </>
    } else {
      formConditional =
        <>
          <h2>Create a new Link</h2>
          <Youtube
            className={`youtube-player ${this.state.isCommenting ? '': 'hidden'}`}
            videoId={this.state.youtube_ID}
            opts={opts}
            onPause={this.getTimestamp}
          />
          <div className={`title ${this.state.isCommenting ? '': 'hidden'} ${this.state.isEditing ? 'hidden': ''}`}>
            <h3>{`${this.state.title}//${localStorage.getItem('username')}`}</h3>
            <button onClick={this.toggleTitle}>Edit</button>
          </div>
          <form onSubmit={this.submitLink}>
            <div className={`url-title ${this.state.isEditing ? '': 'hidden'}`}>
              <input type="url" name='youtube_url' onChange={this.handleInput} value={this.state.youtube_url} placeholder='Youtube URL'/>
              <input type="text" name='title' onChange={this.handleInput} value={this.state.title} placeholder='Title'/>
              <button type='button' onClick={this.showForm}>Continue</button>
            </div>
            {
              this.state.comments.map((comment, index) => (

                  <div key={index}><span>{comment.parsedStamp}</span><span>{comment.body}</span><button type='button' onClick={() => this.removeComment(index)}>Remove</button></div>
              ))
            }
            <CommentForm
              className={`comment-form ${this.state.isCommenting ? '': 'hidden'}`}
              addComment={this.addComment}
              timestamp={this.state.timestamp}
              parsedStamp={this.state.parsedStamp}
            />
            <button className={`${this.state.isCommenting ? '':'hidden'}`}type="submit">Save</button>
          </form>
        </>
    }
    return(
      <div className="container">
          {formConditional}
      </div>
    )
  }
}

export default LinkForm
