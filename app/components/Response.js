import React from 'react'
import Actions from '../actions/Actions'

export default React.createClass({

	render: function() {
		return (
			<div className='response'>
				<p className='response__message'>{this.props.message}</p>
				<button onClick={ this._toFeedback } className='response__button' >Вернуться</button>
			</div>
		)
	},

	_toFeedback: function() {
		Actions.toFeedback()
	}
})
