const menuIcon = document.querySelector('#bar i');
const menuList = document.querySelector('#list');

menuIcon.addEventListener('click', () => {
	menuList.classList.toggle('disappear');
});