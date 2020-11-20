import React from 'react';

export default class CommentDetailForm extends React.Component {

  render() {
    // console.log('render detail form')
    return (
      <div className='comment-detail-form'>
        <div className="timestamp">
          <span className='at'>@</span><span className='parsedStamp'>{this.props.parsedStamp}</span>
        </div>
        <textarea type="text" name='body' value={this.props.body} onChange={this.props.handleInput} placeholder='New Comment' maxLength='200'/>
      </div>
    )
  }
}
