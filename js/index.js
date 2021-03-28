
window.onload = function() {
	var a = document.getElementById("mylink");

	a.onclick = function() {
		alert("YOU NEED HELP? \nJUST GO AND DIE FOR ME MAGGOT!")
		return false;
	}
}

function swapInfoButton(num, name) {
	var y = document.getElementById(name);
	var x = document.getElementsByClassName("select");

	for(var i=0; i < x.length; i++) {
		if(i == num) {
			y.classList.add("active");
		}
		else {
			x[i].classList.remove("active")
		}
	}
}

