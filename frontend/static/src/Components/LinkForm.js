import React from 'react';
import Cookies from 'js-cookie'
// import CommentList from './CommentList.js'
// import CommentForm from './CommentForm.js'


class LinkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      youtube_url: '',
      title: '',
      comments: [],
    }
    this.handleInput=this.handleInput.bind(this)
    this.submitLink=this.submitLink.bind(this)

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
    if(this.props.isLoggedIn===true){
      formConditional =
        <>
          <h2>Create a new Link</h2>
          <form onSubmit={this.submitLink}>
            <input type="url" name='youtube_url' onChange={this.handleInput} value={this.state.youtube_url} placeholder='Youtube URL'/>
            <input type="text" name='title' onChange={this.handleInput} value={this.state.title} placeholder='Title'/>
            <button>Continue</button>
            {/* <CommentList />
            <CommentForm /> */}
          </form>
        </>
    } else if (this.props.isLoggedIn===false){
      formConditional =
      <>
        <span>Login to create a new Link</span>
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
