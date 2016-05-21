import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'
import { EventEmitter } from 'events'
import assign from 'object-assign'
import store from './object-store'

export let AppStore = assign({}, EventEmitter.prototype, {
	checkField: (field, text) => {
		if (text.trim() == '') {
			store.fields[field].error = true
			store.fields[field].message = 'Это поле обязательно для заполнения'
			return null
		} else {
			store.fields[field].error = false

			switch (field) {
				case 'email':
					let reg = /\S+@\S+\.\S+/
					if (!reg.test(text)) {
						store.fields[field].error = true
						store.fields[field].message = 'Некорректный адрес электронной почты'
					} else {
						store.fields[field].error = false
					}
					break

				case 'phone':
					if (isNaN(text)) {
						store.fields[field].error = true
						store.fields[field].message = 'Номер состоит только из цифр'
					}
					break

				default:
					break
			}
		}
	},

	checkForm: function(fields) {
		for (let field in fields) {
			this.checkField(field, fields[field])
		}

		if (store.fields.name.error || store.fields.email.error || store.fields.phone.error || store.fields.text.error) {
			return false
		} else return true

	},

	emitEvent: function(eventName) {
		console.log('emit', eventName)
		this.emit(eventName)
	},

	addListener: function(eventName, callback) {
		console.log('add', eventName, callback)
		this.on(eventName, callback)
	},

	removeListener: function() {
		console.log('remove')
	},

	getMessages: function(messages) {
		let data = JSON.parse(messages)
		store.data.messages = data
		store.page = 'messages'
	}
})

AppDispatcher.register(function(action) {
	switch(action.type) {
		case AppConstants.CHECK_FIELD:
			AppStore.checkField(action.field, action.text)
			AppStore.emitEvent(action.event)
			break

		case AppConstants.CHECK_FORM:
			if (AppStore.checkForm(action.fields)) {
				let response = sendMessage(JSON.stringify(action.fields))
				response ? store.responseMessage = 'Ваше сообщение успешно отправлено.' : store.responseMessage = 'Извините. Во время отправки произошла ошибка.'
				store.page = 'response'
			}
			AppStore.emitEvent(action.event)
			break

		case AppConstants.FEEDBACK:
			store.page = 'feedback'
			AppStore.emitEvent('change')
			break

		case AppConstants.MESSAGES:
			let messages = getMessages()
			messages ? AppStore.getMessages(messages) : store.data.error = 'К сожалению не удалось загрузить сообщения'
			AppStore.emitEvent('change')
			break

	}

})

let sendMessage = function(data) {
	let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

	var xhr = new XHR();

	xhr.open('POST', 'http://test.local/feedback/', false);
	xhr.setRequestHeader("Content-Type", "application/json")

	let response = false
	xhr.onload = function() {
		console.log(this.responseText)
		response = true
	}

	xhr.onerror = function() {
		return( 'Ошибка ' + this.status )
	}

	xhr.send(data)

	return response
}

let getMessages = function() {
	let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

	var xhr = new XHR();

	xhr.open('GET', 'http://test.local/feedback/', false);
	xhr.setRequestHeader("Content-Type", "application/json")

	let messages = false
	xhr.onload = function() {
		messages = this.responseText
	}

	xhr.onerror = function() {
		return( 'Ошибка ' + this.status )
	}

	xhr.send()

	return messages
}
