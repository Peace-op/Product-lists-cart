// Variaveis
const btnCart = document.querySelectorAll('.btn-add');
const btnIncrement = document.querySelectorAll('.btn-increment');
const btnDecrement = document.querySelectorAll('.btn-decrement');
const cartList = document.querySelector('.cart-list');
const cartOrder = document.querySelector('.cart-order');
const carEmpty = document.querySelector('.cart-empty');
const totalCart = document.querySelector('.total-grid');
const btnConfirm = document.querySelector('.confirm');
const body = document.body;
const modalContainer = document.querySelector('.modal-container');
const btnNew = document.querySelector('[data-newOrder]');  
const pratos = [
  {nome: 'waffle', imagem: './assets/images/image-baklava-thumbnail.jpg'},
  {nome: 'brule', imagem: './assets/images/image-creme-brulee-thumbnail.jpg'},
  {nome: 'macaron', imagem: './assets/images/image-macaron-thumbnail.jpg'},
  {nome: 'tiramisu', imagem: './assets/images/image-tiramisu-thumbnail.jpg'},
  {nome: 'baklava', imagem: './assets/images/image-baklava-thumbnail.jpg'},
  {nome: 'pie', imagem: './assets/images/image-meringue-thumbnail.jpg'},
  {nome: 'cake', imagem: './assets/images/image-cake-thumbnail.jpg'},
  {nome: 'brownie', imagem: './assets/images/image-baklava-thumbnail.jpg'},
  {nome: 'panna', imagem: './assets/images/image-panna-cotta-thumbnail.jpg'},
]

pratos.forEach((prato) => {
  let img = {}
  img = document.createElement('img');
  img.src = prato.imagem;
  img.alt = prato.nome;
  img.classList.add('repository-img');
  body.append(img);
})


function adicionarCarrinho(btnCart){
  btnCart.classList.toggle('inativo');
  btnCart.nextElementSibling.classList.toggle('ativo');
  carEmpty.classList.remove('ativo');
  totalCart.classList.add('ativo');
}

btnCart.forEach((botao) =>{
  botao.addEventListener('click',(() => {
    adicionarCarrinho(botao);
    criarResumo(botao);
    quantidadeItens();
    totalItens();
  })) 
})


  
// Button increment
function adicionarItens(event){
  let quantidade = +this.previousElementSibling.innerText + 1;
  this.previousElementSibling.innerText = quantidade;
  limparCarrinho(event.currentTarget);
  atualizarCarrinho(event.currentTarget);
  ordernarLista();
  quantidadeItens();
  totalItens();
}

btnIncrement.forEach((botao) => {
  botao.addEventListener('click',adicionarItens);
})

// Button decrement

function removerItens(event){
  const btnCart = this.parentElement.previousElementSibling;
  if(+this.nextElementSibling.innerText > 1){
    let quantidade = +this.nextElementSibling.innerText - 1;
    this.nextElementSibling.innerText = quantidade;
    limparCarrinho(event.currentTarget)
    atualizarCarrinho(event.currentTarget);
    
  } else{
    adicionarCarrinho(btnCart);
    limparCarrinho(event.currentTarget);
    if(!cartList.hasChildNodes()){
      carEmpty.classList.add('ativo');
      totalCart.classList.remove('ativo');
    }
  }
  ordernarLista();
  quantidadeItens();
  totalItens();
}


btnDecrement.forEach((botao) => {
  botao.addEventListener('click',removerItens);
})

// Carrinho
function atualizarCarrinho(element){
  const btnCart = element.parentElement.previousElementSibling;
  criarResumo(btnCart)
}

function limparCarrinho(element){
  const itemId = element.closest('li').getAttribute('id');
  const resumoItem = document.querySelector(`[data-resumo=${itemId}]`)
  cartList.removeChild(resumoItem);
 
}


// Lista
function ordernarLista(){
  const cartListLi = Array.from(document.querySelectorAll('[data-resumo]'));
  cartListLi.sort((a,b) => {
    const resumoA = a.getAttribute('data-resumo').toLowerCase();
    const resumoB = b.getAttribute('data-resumo').toLowerCase();
    
    if (resumoA < resumoB) return -1;
    if (resumoA > resumoB) return 1;
    return 0;
  })
  cartList.innerHTML = '';
  cartListLi.forEach(li => cartList.appendChild(li));
}
function quantidadeItens(){
  const itemQtd = Array.from(document.querySelectorAll('.item-qtd'));
  const cartQtd = document.querySelector('.cart-qtd');
  let arrayQtd = [];
  itemQtd.forEach((item) => {
    arrayQtd.push(+item.innerText.replace('x',''));
  })
  let somaQtd = arrayQtd.reduce((acumulador, valorAtual) => {
    return acumulador + valorAtual;
  },0);
  cartQtd.innerText = somaQtd;
}
function totalItens(){
  const itemTot = Array.from(document.querySelectorAll('.item-tot'));
  const cartTot = document.querySelector('.total-price');
  let arrayTot = [];
  itemTot.forEach((item) => {
    arrayTot.push(+item.innerText.replace('$',''));
  })
  let somaTot = arrayTot.reduce((acumulador, valorAtual) => {
    return acumulador + valorAtual;
  },0);
  cartTot.innerText = '$'+ somaTot.toFixed(2);
}



// Criar Resumo
function criarResumo(element){


  const infoItens = element.closest('li');
  const amount = element.nextElementSibling.querySelector('span');
  
  const resumoLi = document.createElement('li');
  resumoLi.classList.add('cart-item');
  resumoLi.dataset.resumo = infoItens.getAttribute('id')
  
  const resumoPrato = document.createElement('h2');
  resumoPrato.classList.add('font-1-s-b');
  resumoPrato.classList.add('color-rose-900');
  resumoPrato.innerText = infoItens.querySelector('h2').innerText;
  
  const resumoDiv = document.createElement('div');
  resumoDiv.classList.add('itens-info');
  
  
  const resumoQtde = document.createElement('span');
  resumoQtde.classList.add('item-qtd');
  resumoQtde.classList.add('font-1-s-b');
  resumoQtde.classList.add('color-red');
  resumoQtde.innerText = amount.innerText + 'x';
  
  const resumoUn = document.createElement('span');
  resumoUn.classList.add('cor-500')
  resumoUn.classList.add('font-1-s');
  resumoUn.classList.add('color-rose-500');
  resumoUn.innerText = infoItens.querySelector(':scope > span').innerText;
  
  const total = +amount.innerText *  +resumoUn.innerText.replace('$','');
  const resumoTot = document.createElement('span');
  resumoTot.classList.add('color-rose-500');
  resumoTot.classList.add('font-1-s-b');
  resumoTot.classList.add('item-tot');
  resumoTot.innerText = '$'+ total.toFixed(2);

  resumoUn.innerText = '@ ' + resumoUn.innerText;

  const btnRemove = document.createElement('button');
  btnRemove.classList.add('btn-remove');
  
  resumoDiv.appendChild(resumoPrato);
  resumoDiv.appendChild(resumoQtde);
  resumoDiv.appendChild(resumoUn);
  resumoDiv.appendChild(resumoTot);
  resumoLi.appendChild(resumoDiv);
  resumoLi.appendChild(btnRemove);
  cartList.appendChild(resumoLi);

  const allBtnRemove = document.querySelectorAll('.btn-remove');
  
  allBtnRemove.forEach((botao) => {
    botao.addEventListener('click',clearItem);
  })
}


function clearItem(event){
  const liBtn = event.target.parentElement;
  const itemId = document.getElementById(liBtn.dataset.resumo).querySelector('.btn-add')
  liBtn.parentElement.removeChild(liBtn);
  quantidadeItens();
  totalItens();
  adicionarCarrinho(itemId);
  if(!cartList.children.length){
    carEmpty.classList.add('ativo');
    totalCart.classList.remove('ativo');
  }
}



function newOrder(){
  modalContainer.classList.toggle('ativo');
  while (cartOrder.firstChild){
    cartOrder.removeChild(cartOrder.firstChild);
  }
  while (cartList.firstChild){
    cartList.removeChild(cartList.firstChild);
  }
  clearAllItens();
  quantidadeItens();
}

btnNew.addEventListener('click',newOrder)



function orderSummary(event){
  const cartItens = document.querySelectorAll('.cart-item');
  const cartItensClone = Array.from(cartItens).map((item) => item.cloneNode(true));


  const total = document.querySelector('.total-flex');
  const totalClone = total.cloneNode(true);
  

  cartItensClone.forEach((order) => {
    const totalPrice = order.querySelector('.item-tot');
    const itemInfo =  order.querySelector('.itens-info');
    const itemName = order.dataset.resumo;
    const img = document.querySelector(`[alt=${itemName}]`).cloneNode(true);
    itemInfo.removeChild(totalPrice);
    order.classList.remove('cart-item');
    order.append(img);
    order.append(totalPrice);
    cartOrder.append(order);
    cartOrder.append(totalClone);
    
  })


  modalContainer.classList.toggle('ativo');
  outSideClick(modalContainer,(() => newOrder()));

}

btnConfirm.addEventListener('click',orderSummary);

function outSideClick(element,callback){
  const html = document.documentElement;
  html.addEventListener('click',outsideHandleClick);
  function outsideHandleClick(event){
    if(element === event.target){
      callback();
      html.removeEventListener('click',outsideHandleClick);
    }
  }
}



function clearAllItens(){
  const btnCart = document.querySelectorAll('.btn-add.inativo');
  btnCart.forEach((botao) =>{
    adicionarCarrinho(botao);
    carEmpty.classList.add('ativo');
    totalCart.classList.remove('ativo');
  })
}











  










