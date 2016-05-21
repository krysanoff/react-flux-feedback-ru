import React from 'react'
import Actions from '../actions/Actions'

export default React.createClass({

	showMessages: function(messages) {
		let message = new Array()
		for(let time in messages) {
			message.push(JSON.parse(messages[time]))
			let date = this.toDate(time)
			message[message.length-1].time = date
		}
		console.log(message)
		return (
			message.map(function(item, key) {
				return(
					<div className='messages__item' key={key} >
						<div className='user'>
							<div className='user__data'>
								<p className='user__name' >{ item.name }</p>
								<p className='user__contacts'>
									<a className='user__link' href={'mailto:' + item.email}>@</a>
									<a className='user__link' href={'skype:' + item.phone + '?call'}>&#9742;</a>
								</p>
							</div>
							<div className='time'>
								<p className='time__date' >
									{item.time[2]}.{item.time[1]}.{item.time[0]}
								</p>
								<p className='time__time' >
									{item.time[3]}:{item.time[4]}:{item.time[5]}
								</p>
							</div>
						</div>
						<div className='messages__text'>{ item.text }</div>
					</div>
				)
			})
		)
	},

	toDate: function(time) {
		let date = time.split('-')
		console.log(date)
		return date
	},

	render: function() {
		return (
			<div className='messages'>
				<header className='messages__header'>
					<h2>Полученные сообщения</h2>
				</header>
				{ this.showMessages(this.props.messages) }
				<button onClick={ this._toFeedback } className='messages__button' >Вернуться</button>
			</div>
		)
	},

	_toFeedback: function() {
		Actions.toFeedback()
	}
})
