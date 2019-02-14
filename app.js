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
		const StoredItems = [
			{
				title: "Item Um",
				desc: "Este é o primeiro item",
				detail: "E aqui vamos ter detalhes do item"
			},
			{
				title: "Item Dois",
				desc: "Este é o segundo item",
				detail: "E aqui vamos ter detalhes do item"
			}
		];

		const items = StoredItems;

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

	static clearItems(){
		document.querySelector("#title").value = "";
		document.querySelector("#desc").value = "";
		document.querySelector("#detail").value = "";
	}
}
//Classe do armazenamento

//Evento READ
document.addEventListener("DOMContentLoaded", UI.displayItems)
//Evento CREATE
document.querySelector("#item-form").addEventListener("submit", (e) => {
	
	e.preventDefault();

	const title = document.querySelector("#title").value;
	const desc = document.querySelector("#desc").value;
	const detail = document.querySelector("#detail").value;

	const item = new Item(title, desc, detail);
	
	UI.addItemToList(item);
	UI.clearItems();
});
//Evento DELETE