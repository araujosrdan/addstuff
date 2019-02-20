// Classe dos Items
class Item {
	constructor(title, desc, detail){
		this.title = title;
		this.desc = desc;
		this.detail = detail;
	}
}
//Classe da interface
class UI {
	static displayItems(){
		const items = Store.getItems();

		items.forEach((item) => UI.addItemToList(item));
	}

	static addItemToList(item){
		const item_list = document.querySelector("#item-list");

		const row = document.createElement("tr");

		row.innerHTML = `
			<td>${item.title}</td>
			<td>${item.desc}</td>
			<td>${item.detail}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`;

		item_list.appendChild(row);
	}

	static deleteItem(el){
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
		}
	}

	static showAlerts(msg, type, title){
		if (type == 'error') {
			iziToast.error({
				title: title,
				message: msg
			});	
		}
		if (type == 'success') {
			iziToast.success({
				title: title,
				message: msg
			});	
		}
		if (type == 'warning') {
			iziToast.warning({
				title: title,
				message: msg
			});	
		}
		
	}

	static clearItems(){
		document.querySelector("#title").value = "";
		document.querySelector("#desc").value = "";
		document.querySelector("#detail").value = "";
	}
}
//Classe do armazenamento
class Store{
	static getItems(){
		let items;

		if (localStorage.getItem("items") === null) {
			items = [];
		} else {
			items = JSON.parse(localStorage.getItem("items"));
		}

		return items;
	}

	static addItem(item){
		const items = Store.getItems();
		items.push(item);
		localStorage.setItem("items", JSON.stringify(items));
	}

	static removeItem(detail){
		const items = Store.getItems();
		items.forEach((item, index) => {
			if (item.detail === detail) {
				items.splice(index, 1);
			}
		});
		localStorage.setItem("items", JSON.stringify(items));
	}
}
//Evento READ
document.addEventListener("DOMContentLoaded", UI.displayItems)
//Evento CREATE
document.querySelector("#item-form").addEventListener("submit", (e) => {
	
	e.preventDefault();

	const title = document.querySelector("#title").value;
	const desc = document.querySelector("#desc").value;
	const detail = document.querySelector("#detail").value;

	if (title === "" || desc === "" || detail === "") {
		UI.showAlerts("Todos campos são obrigatórios!", "error", "Ops");
		return false;
	} else {
		const item = new Item(title, desc, detail);
		UI.addItemToList(item);
		Store.addItem(item);
		UI.clearItems();
		UI.showAlerts("Gravado com sucesso!", "success", "Oba");
	}

});
//Evento DELETE
document.querySelector("#item-list").addEventListener("click", (e) =>{
	UI.deleteItem(e.target);
	Store.removeItem(e.target.parentElement.previousElementSibling.textContent);
	UI.showAlerts("Excluído com sucesso!", "warning", "Ok");
});