import React from 'react'
import { AppStore } from '../stores/AppStore'
import store from '../stores/object-store'

import Response from './Response'
import Messages from './Messages'
import { Feedback } from './Feedback'

export const App = React.createClass({

	getInitialState: function() {
		return store
	},

	componentDidMount: function() {
		AppStore.addListener('change', this._onChange)
	},

	currentPage: function(state) {
		switch (state.page){
			case 'feedback':
				return (<Feedback
							fields={state.fields} />
				)

			case 'response':
				return (<Response message={state.responseMessage} />)

			case 'messages':
				return (<Messages messages={state.data.messages}/>)
		}
	},

	render: function() {
		return(
			<div className='main'>
				<header className='header'>
					<h1 className='header__title'>Форма обратной связи</h1>
				</header>

				{ this.currentPage(this.state) }

			</div>
			)
	},

	_onChange: function() {
		this.setState(store)
	}
})
