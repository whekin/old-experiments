let select_tonality = document.getElementById("select_tonality");
let output = document.querySelector("output");

let harmonizer = new Harmonizer();

let tonality = select_tonality.options[select_tonality.selectedIndex].value;

let printHarmGamma = (tonality) => {

	
	let harmonizedGamma = harmonizer.toHarmonize(tonality);

	let chordsInTonality;
	let ul = document.createElement("ul");

	for (let i = 0; i < harmonizedGamma.length; ++i) {
		let li = document.createElement("li");
		li.innerHTML = 
			"<span class='chord_name'>"
			+ harmonizedGamma[i].name.replace(/(\w)d(?!im)(\w*)/i, "$1#$2")
			+ "</span><span class='chord_notes'>"
			+` (${harmonizedGamma[i].notes.join(", ").replace(/(\w)d/g, "$1#")})`
			+ "</span>";
		ul.appendChild(li);
	}
	output.innerHTML = "";
	output.appendChild(ul);
}
printHarmGamma(tonality);

select_tonality.addEventListener("change", () => {
	tonality = select_tonality.options[select_tonality.selectedIndex].value;
	printHarmGamma(tonality);
}, false);