const menuIcon = document.querySelector('#bar i');
const menuList = document.querySelector('#list');
const inputs = document.querySelectorAll('input');

menuIcon.addEventListener('click', () => {
	menuList.classList.toggle('disappear');
});

const emptyField = () => {
	inputs.forEach( input => {
		if(input.type !== "submit"){
			input.value = " "
		}
	});
};

emptyField();