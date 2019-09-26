(function(window) {
	const interval = 72;

	window.words_fade_in = function(html_element) {
		let word,
			space,
			words,
			save,
			counter;
		word = /./gim;
		space = /\s/;


		let text = "Здравствуй! Пусть этот своеобразный подарок улыбнёт Тебя и подарит Тебе хотя бы капельку радости и принесёт счастье! С Днём Рождения, Вика! :)"

		words = text.match(word);

		counter = 0;
		for (let index = 0, len = words.length; index < len; ++index) {
			++counter;
			if (counter > 1 && space.test(words[index - 1]) && space.test(words[index])) {
				continue;
			}

			let time = counter * interval;

			setTimeout(function() {
				let span = document.createElement("span");
				if (space.test(words[index])) {
			 		span.innerHTML = "&nbsp;";

				} else {
					span.className = "fade_in_word";
					span.innerHTML = words[index];
				}
				html_element.appendChild(span);
			}, time);
		}
		return interval * words.length;
	}
})(window)