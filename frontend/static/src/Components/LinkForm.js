import React from 'react';
import Cookies from 'js-cookie'
// import CommentList from './CommentList.js'
import CommentForm from './CommentForm.js'


class LinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      youtube_url: '',
      title: '',
      comments: [],
      isCommenting: false,
    }
    this.handleInput=this.handleInput.bind(this);
    this.addComment = this.addComment.bind(this);
    this.submitLink=this.submitLink.bind(this);
    this.showForm=this.showForm.bind(this);
  }
  // handleObject(event) {
  //   let updateState={...this.state.updateState}
  //
  // }
  showForm() {
    this.setState({isCommenting: true})
  }
  addComment(comment) {
    const comments = [...this.state.comments];
    comments.push(comment);
    this.setState({comments});
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async submitLink(event) {
    event.preventDefault()
    const response = await fetch('/api/links/create', {
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
    if(localStorage.getItem('login')===null) {
      formConditional =
      <>
        <span>Login to create a new Link</span>
      </>
    } else {
      formConditional =
        <>
          <h2>Create a new Link</h2>
          <form onSubmit={this.submitLink}>
            <input type="url" name='youtube_url' onChange={this.handleInput} value={this.state.youtube_url} placeholder='Youtube URL'/>
            <input type="text" name='title' onChange={this.handleInput} value={this.state.title} placeholder='Title'/>
            <button type='button' onClick={this.showForm}>Continue</button>
            {
              this.state.comments.map((comment, index) => (

                  <div key={index}><span>{comment.timestamp}</span><span>{comment.body}</span></div>
              ))
            }
            <CommentForm className={`comment-form ${this.state.isCommenting ? '': 'hidden'}`}addComment={this.addComment} />
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
