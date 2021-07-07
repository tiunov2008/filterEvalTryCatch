const filterByType = (type, ...values) => values.filter(value => typeof value === type),//обявляем новую функцию которая принимает тип и значения и фильтрует их

	hideAllResponseBlocks = () => {//обявляем новую функцию
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));//получаем все div с классом dialog__response-block
		responseBlocksArray.forEach(block => block.style.display = 'none');//скрываем их все
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {//обявляем новую функцию
		hideAllResponseBlocks();//вызов hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block'; // покузываем все элементы с пережанным селектором
		if (spanSelector) {// если spanSelector существует
			document.querySelector(spanSelector).textContent = msgText;// то мы внутрь него записываем msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),//созраняем вызов showResponseBlock в showError

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),//созраняем вызов showResponseBlock в showResults

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),//созраняем вызов showResponseBlock в showNoResults


	tryFilterByType = (type, values) => {//обявляем новую функцию
		try {//Перехват ошибок
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");//созраняем результат вызова filterByType в valuesArray
			const alertMsg = (valuesArray.length) ?//если valuesArray не пуст то
				`Данные с типом ${type}: ${valuesArray}` ://сохраняет это иначе
				`Отсутствуют данные типа ${type}`;//сохраняет это в alertMsg
			showResults(alertMsg);//вызываем showResults
		} catch (e) {//Перехват ошибок
			showError(`Ошибка: ${e}`);//вызываем showError
		}
	};

const filterButton = document.querySelector('#filter-btn');//находим кнопку с id filter-btn и созраняем в filterButton

filterButton.addEventListener('click', e => {//отлавливаем клик по кнопке filterButton
	const typeInput = document.querySelector('#type');//находим элемент с id type и созраняем в typeInput
	const dataInput = document.querySelector('#data');//находим элемент с id вata и созраняем в dataInput

	if (dataInput.value === '') {//если dataInput пуст
		dataInput.setCustomValidity('Поле не должно быть пустым!');//устанавливает специальное сообщение для dataInput
		showNoResults();//вызываем showNoResults
	} else {
		dataInput.setCustomValidity('');//устанавливает специальное сообщение для  dataInput
		e.preventDefault();//отменяем действие браузера по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());//вызываем tryFilterByType
	}
});

