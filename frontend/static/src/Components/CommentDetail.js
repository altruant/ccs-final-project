import React from 'react';
import CommentDetailForm from './CommentDetailForm.js'

export default class CommentDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditingComment: false,
      body: '',
    }

    this.editComment=this.editComment.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.setState({...this.props.comment});
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  editComment() {
    this.setState({isEditingComment: !this.state.isEditingComment})
    this.props.updateComment(this.props.comment, this.state.body);
  }
  render() {
    return (
      <div className='display-comment' key={this.props.index}>
        <button type='button' className={`timestamp-button button ${this.state.isEditingComment ? 'hidden': ''}`} onClick={() => this.props.seekToTime(this.props.comment.timestamp)}>
          <div className="timestamp">
            <span className='at'>@</span><span className='parsedStamp'>{this.props.comment.parsedStamp}</span>
          </div>
          <span className='body'>{this.props.comment.body}</span>
        </button>
        <div className={`edit-delete-buttons`}>
          <button className={`icon-button ${this.state.isEditingComment ? 'hidden': ''} ${this.props.isEditing ? '': 'hidden'} ${this.props.isOwner ? '' : 'hidden'}`} onClick={() => this.props.removeComment(this.props.index)}>
            <span className="iconify x-icon" data-icon="octicon-x" data-inline="false"></span>
          </button>
          <button className={`icon-button ${this.state.isEditingComment ? 'hidden': ''} ${this.props.isEditing ? '': 'hidden'} ${this.props.isOwner ? '' : 'hidden'}`} onClick={() => this.editComment()}>
            <span className="iconify gear-icon " data-icon="octicon:gear-24" data-inline="false"></span>
          </button>
          <div className={`save-comment ${this.state.isEditingComment ? '': 'hidden'}`}>
            <button className={`icon-button`} onClick={this.editComment}>
              <span className="iconify check-icon" data-icon="octicon:check-16" data-inline="false"></span>
            </button>
          </div>
        </div>
        <div className={`comment-form-container ${this.props.isEditing ? '': 'hidden'} ${this.state.isEditingComment ? '': 'hidden'}`}>
          <CommentDetailForm
            body={this.state.body}
            timestamp={this.props.comment.timestamp}
            parsedStamp={this.props.comment.parsedStamp}
            handleInput = {this.handleInput}
          />
        </div>
      </div>
    )
  }
}
