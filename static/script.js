
//Suggestion Box Function

let locations = ["KENPARK",
	"Superindo", "RSIA 2", "Kalijudan 2", "Mulyorejo 2", "UNAIR 2", "Galaxy 2", "Kertajaya Indah", "ITS", "Bundaran ITS", "Manyar Kerta Adi",
	"RS Haji 2", "Kopertis", "Universitas Kristen", "Semolowaru 2", "Semampir", "STIKOM", "Pandugo 2", "Penjaringan Asri", "Rungkut Madya 2",
	"Gunung Anyar Lor 2", "Gunung Anyar Timur 2", "Gunung Anyar Timur 1", "Gunung Anyar Lor 1", "Rungkut Madya 1", "Pandugo 1",
	"Sentra UKM MERR", "Semolowaru 1", "ITATS", "MERR SMP 19", "RS Haji 1", "Koni MERR", "Galaxy 1", "UNAIR 1", "Kalijudan 1", "RSIA 1",
	"Kenjeran", "Kejawan Putih Tambak", "PENS 1", "Klampis", "Gramedia", "Kertajaya", "Gubeng Airlangga", "Lapangan Hoki", "SMAN 4",
	"Pemuda", "Panglima Sudirman", "Sono Kembang", "Urip Sumaharjo 2", "Pandegiling 2", "Santa Maria", "Darmo", "Kutai 1", "KPU",
	"Mayjend Sungkono", "Darmo Park 2", "Makam Pahlawan 1", "Putat Gede", "Patung Kuda 1",	"Jono Soewojo 2","PTC B","Bundaran UNESA",
	"SMPN 28 A","SMPN 28 B","Villa Bukit Mas","UNESA","PTC A","Jono Soewojo 1","Patung Kuda 2","Makam Pahlawan 2","Darmo Park 1",
	"Gedung Juang 45","Indragiri","Kutai 2","RS Darmo","Pandegiling 1","Urip Sumaharjo 1","Basuki Rahmat","Kaliasin","Simpang Dukuh",
	"Gubernur Suryo","Balai Kota","Moestopo","RSUD dr. Soetomo","UNAIR","Samsat Manyar","Koni","PENS 2","Terminal Purabaya","Dukuh Menanggal",
	"Siwalankerto 1","Taman Pelangi","RS Bhayangkara","UBHARA","PUSVETMA","Ketintang","Joyoboyo","Museum BI","RS Darmo","Embong Malang",
	"Blauran","Pirngadi","Pasar Turi","Masjid Kemayoran","Indrapura","Jembatan Merah","Veteran","Tugu Pahlawan","Alun Alun Contong",
	"Siola","Tunjungan","Joyoboyo 2","RSAL","Wonocolo","UIN","Jemur Ngawinan","Siwalankerto 2","Kerto Menanggal","Tunjungan Plaza"];
// Sort locations in ascending order
let sortedLocations = locations.sort();

// Reference the input fields with ids "email" and "password"
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

// Execute function on keyup for the email input
emailInput.addEventListener("input", () => {
	handleAutocomplete(emailInput);
});

// Execute function on keyup for the password input
passwordInput.addEventListener("input", () => {
	handleAutocomplete(passwordInput);
});

function handleAutocomplete(input) {
	// Create or get the autocomplete list for the specific input field
	let list = getOrCreateAutocompleteList(input);

	// Clear previous suggestions
	removeElements(list);

	// Loop through the array of locations
	for (let loc of sortedLocations) {
		// Convert input to lowercase and compare with each location
		if (
			loc.toLowerCase().startsWith(input.value.toLowerCase()) &&
			input.value != ""
		) {
			// Create li element
			let listItem = document.createElement("li");
			// One common class name
			listItem.classList.add("list-items");
			listItem.style.cursor = "pointer";
			listItem.setAttribute("onclick", `displayLocation('${loc}', '${input.id}')`);
			// Display matched part in bold
			let word = "<b>" + loc.substr(0, input.value.length) + "</b>";
			word += loc.substr(input.value.length);
			// Display the value in the array
			listItem.innerHTML = word;
			list.appendChild(listItem);
		}
	}
}

function displayLocation(value, inputId) {
	// Display the selected value in the corresponding input field
	document.getElementById(inputId).value = value;

	// Clear the autocomplete list for the specific input field
	let list = getOrCreateAutocompleteList(document.getElementById(inputId));
	removeElements(list);
}

function removeElements(list) {
	// Clear all the items in the specified list
	let items = list.querySelectorAll(".list-items");
	items.forEach((item) => {
		item.remove();
	});
}

function getOrCreateAutocompleteList(input) {
	// Try to find an existing list associated with the input field
	let list = input.nextElementSibling;
	if (!list || !list.classList.contains("list")) {
		// If the list doesn't exist, create a new one
		list = document.createElement("ul");
		list.classList.add("list");
		input.parentNode.insertBefore(list, input.nextSibling);
	}
	return list;
}



// check if fiels empty
'use strict';

$(function () {

	$("input[type='password'][data-eye]").each(function (i) {
		var $this = $(this),
			id = 'eye-password-' + i,
			el = $('#' + id);

		$this.wrap($("<div/>", {
			style: 'position:relative',
			id: id
		}));

		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-' + i,
		}).css({
			position: 'absolute',
			right: 10,
			top: ($this.outerHeight() / 2) - 12,
			padding: '2px 7px',
			fontSize: 12,
			cursor: 'pointer',
		}));

		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));

		var invalid_feedback = $this.parent().parent().find('.invalid-feedback');

		if (invalid_feedback.length) {
			$this.after(invalid_feedback.clone());
		}

		$this.on("keyup paste", function () {
			$("#passeye-" + i).val($(this).val());
		});
		$("#passeye-toggle-" + i).on("click", function () {
			if ($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			} else {
				$this.attr('type', 'text');
				$this.val($("#passeye-" + i).val());
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});

	$(".my-login-validation").submit(function () {
		var form = $(this);
		if (form[0].checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		form.addClass('was-validated');
	});
});