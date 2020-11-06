import React from 'react'
import TimeField from 'react-simple-timefield';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      timestamp: '00:00:00',
      body: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  addComment() {
    this.props.addComment(this.state);
    this.setState({timestamp: '00:00:00', body: ''});
  }

  render() {
    return(
      <div className={this.props.className}>
        <TimeField
          value={this.state.timestamp}
          onChange={this.handleInput}
          input={<input type="text" name='timestamp'/>}
          colon=':'
          showSeconds
        />
        <input type="text" name='body' value={this.state.body} onChange={this.handleInput}/>
        <button type="button" onClick={this.addComment}>Add Comment</button>
      </div>
    )
  }
}

export default CommentForm
