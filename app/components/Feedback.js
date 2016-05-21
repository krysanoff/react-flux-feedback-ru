import React from 'react'
import Actions from '../actions/Actions'
import { AppStore } from '../stores/AppStore'

import Inputs from './Inputs'

export const Feedback = React.createClass({

	// componentDidMount: function() {
	// 	console.log('feedback did mount')
	// 	AppStore.addListener('change', this._onChange)
	// },

	render: function() {
		let events = {
			onClick: this._onClick,
			onBlur: this._onBlur,
			getMessages: this._getMessages
		}
		return (
			<form className='form'>

				<Inputs fields={this.props.fields} events={events}/>

			</form>
		)
	},

	_onClick: function () {
		let form = document.getElementsByTagName('form')[0],
			eventName = 'change',
			fields = {'name': form.name.value,
						'email': form.email.value,
						'phone': form.phone.value,
						'text': form.text.value
					}

		Actions.checkForm(eventName, fields)
	},

	_onBlur: function (event) {
		let field = event.target.id,
			text = event.target.value,
			eventName = 'change'

		Actions.checkField(eventName, field, text)
	},

	_getMessages: function() {
		Actions.getMessages()
	}
})
