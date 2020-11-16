import React from 'react'

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      body: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }



  addComment() {
    this.props.addComment({timestamp: this.props.timestamp, parsedStamp: this.props.parsedStamp, body: this.state.body});
    this.setState({body: ''});
  }

  render() {
    return(
      <div className={this.props.className}>
        <span>{this.props.parsedStamp}</span>
        <textarea type="text" name='body' value={this.state.body} onChange={this.handleInput} placeholder='New Comment'/>
        <button className={`button ${this.state.body ? '': 'hidden'}`} type="button" onClick={this.addComment}>Add Comment</button>
      </div>
    )
  }
}

export default CommentForm
