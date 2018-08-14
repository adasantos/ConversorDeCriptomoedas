const tabela = document.querySelector("#tabelaMoeda");
const tabelaConvertido = document.querySelector("#tabelaValorConvertido");
const listaConv = document.querySelector("#listaMoeda");
const valorAConverter = document.querySelector("#valorAConverter");

function listaAPI(){
	let moeda = new XMLHttpRequest();
	moeda.open("GET", "https://api.coinmarketcap.com/v2/ticker/?convert=BRL&limit=10", false);
	moeda.send();
	let lista = JSON.parse(moeda.response).data;
	return lista;
}


function montaTabela(){

	let lista = listaAPI();

	for(let i in lista){

		let tr = document.createElement('tr');
		let td_rank = document.createElement('td');
		let td_name = document.createElement('td');
		let td_symbol = document.createElement('td');
		let td_price_brl = document.createElement('td');		
		let td_price_usd = document.createElement('td');

		td_rank.innerText = lista[i].rank;
		tr.appendChild(td_rank);
		td_name.innerText = lista[i].name;
		tr.appendChild(td_name);
		td_symbol.innerText = lista[i].symbol;
		tr.appendChild(td_symbol);
		td_price_brl.innerText = lista[i].quotes.BRL.price;
		tr.appendChild(td_price_brl);
		td_price_usd.innerText = lista[i].quotes.USD.price;
		tr.appendChild(td_price_usd);

		tabela.appendChild(tr);


	}
}


function listaConversor(){

	let lista = listaAPI();

	for(let i in lista){

		let option_name = document.createElement('option');
		option_name.setAttribute("value",lista[i].name)

		option_name.textContent = lista[i].name;

		listaConv.appendChild(option_name);


	}
}

function converterMoeda(){

	let lista = listaAPI();
	let valorAConv = valorAConverter.value;

	let valorLista = document.getElementById("listaMoeda").value;

	console.log(valorLista);

	if(document.getElementById("resultado")!=null){
		document.getElementById("resultado").remove();
	}
	else{

	}

	for(let i in lista){

		if(valorLista == lista[i].name){

		let valorMoeda = lista[i].quotes.BRL.price;
		
		var valorConvertido = (valorAConv/valorMoeda);
	
		let td_valor_conv = document.createElement('td');
		td_valor_conv.setAttribute("id","resultado");

		td_valor_conv.innerText = valorConvertido;

		console.log(valorMoeda);
		console.log(valorAConv);
		console.log(valorConvertido);

		tabelaConvertido.appendChild(td_valor_conv);


		}
		else{}

	}
}

document.addEventListener("load",montaTabela(),listaConversor());



