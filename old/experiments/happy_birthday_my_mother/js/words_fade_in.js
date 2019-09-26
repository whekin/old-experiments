(function(window) {
	var interval = 50;

	window.words_fade_in = function(html_element) {
		var word,
			space,
			words,
			save,
			counter,
			current_string;
		word = /./gim;
		space = /\s/;

		current_string = "";
		save = html_element.textContent;
		
		words = save.match(word);
		
		// delete
		html_element.innerHTML = "";

		counter = 0;
		for (let index = 0, len = words.length - 1; index < len; ++index) {
			++counter;
			if (counter > 1 && space.test(words[index - 1]) && space.test(words[index])) {
				continue;
			}

			var time = counter * interval;
			
			setTimeout(function() {
				var span = document.createElement("span");
				if (space.test(words[index])) {
			 	span.innerHTML = "&nbsp;";
					
				} else {
					span.className = "fade_in_word";
					span.innerHTML = words[index];
				}
				html_element.appendChild(span);
			}, time);
		}
	}
})(this)