import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'

export default {
	checkField: function(event, field, text) {
		console.log ('action.checkField', field, text)
		AppDispatcher.dispatch({
			type:AppConstants.CHECK_FIELD,
			event: event,
			field: field,
			text: text
		})
	},

	checkForm: function(event, fields) {
		AppDispatcher.dispatch({
			type:AppConstants.CHECK_FORM,
			event: event,
			fields: fields
		})
	},

	toFeedback: function() {
		AppDispatcher.dispatch({
			type: AppConstants.FEEDBACK
		})
	},

	getMessages: function() {
		AppDispatcher.dispatch({
			type: AppConstants.MESSAGES
		})
	}

}
