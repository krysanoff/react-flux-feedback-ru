import React from 'react'
import Actions from '../actions/Actions'
import { AppStore } from '../stores/AppStore'
import Errors from './Errors'

export default React.createClass({

	// componentDidMount: function() {
	// 	console.log('feedback did mount')
	// 	AppStore.addListener('change', this._onChange)
	// },
	createField: function(props, events) {
		let fields = []
		for (let key in props) {
			fields.push(key)
		}

		return (
			fields.map(function(field, key) {
				let error
				if (props[field].error) {
					error = <Errors message={props[field].message} />
				}

				if (field == 'text') {
					return (
						<div className='form__field' key={key}>
							<textarea className='form__message'
								placeholder={props[field].placeholder}
								id={props[field].id}
								onBlur={events.onBlur}>
							</textarea>
							{ error }
						</div>
					)
				}
				else {
					return(
						<div className='form__field' key={key}>
							<p className='form__label'><label htmlFor='name'>{props[field].label}</label></p>
							<input
								className='form__input'
								type={props[field].type}
								id={props[field].id}
								placeholder={props[field].placeholder}
								ref={props[field].id}
								onBlur={events.onBlur} />
							{ error }
						</div>
						)
				}
			}, this.props.fields)
			)
	},

	render: function() {
		return (
			<div>

				{ this.createField(this.props.fields, this.props.events) }

				<input
					type='button'
					className='form__submit'
					onClick={this.props.events.onClick}
					value='Отправить' />

				<p className='form__link'><a onClick={this.props.events.getMessages} >Посмотреть все сообщения</a></p>
			</div>
		)
	}
})
