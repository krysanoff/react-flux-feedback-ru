export default {
	page: 'feedback',

	fields: {
		name: {
			id: 'name',
			type: 'text',
			placeholder: 'Введите Ваше имя',
			label: 'Ваше имя',
			error: false
		},

		email: {
			id: 'email',
			type: 'email',
			placeholder: 'Адрес электронной почты',
			label: 'E-mail',
			error: false
		},

		phone: {
			id: 'phone',
			type: 'tel',
			placeholder: 'Номер телефона',
			label: 'Телефон',
			error: false
		},

		text: {
			id: 'text',
			placeholder: 'Ваше сообщение',
			error: false
		}
	},

	write: {

	},

	data: {
		messages: null
	}
}
