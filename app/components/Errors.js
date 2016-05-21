import React from 'react'
import Actions from '../actions/Actions'
import { AppStore } from '../stores/AppStore'

export default React.createClass({

	render: function() {
		return (
			<p className='form__error'>
				{this.props.message}
			</p>
		)
	}
})
