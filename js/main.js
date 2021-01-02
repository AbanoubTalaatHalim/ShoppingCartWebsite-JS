if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    if (sessionStorage.getItem('AuthenticationState') === null) {
        var cart = document.getElementById('cartlink')
            cart.style.display = 'none';
        }else{
            var logined = document.getElementById('loginlink')
            var logout = document.getElementById('logoutlink')
            logined.style.display = 'none';
            logout.style.display = 'inline';
        }
    
    //addnewproduct();

}


window.addEventListener('load',function getdata(){
    let products = null;
            $.ajax({
            'async': false,
            'global': false,
            'url': "/data.json",
            'dataType': "json",
            'success': function(data) {
                 products = data;
                 console.log(products)
            }
            });
            
            $('body').on('click','.add-cart',function(e){
                let carts = document.querySelectorAll('.add-cart');
                var p = e.currentTarget.parentNode;
                var i = -1;
                while( (p = p.previousSibling) != null ) {
                     i++;
                }
                     console.log(i);
                                cartNumbers(products[i]);
                                totalCost(products[i])
                                console.log(products[i])
            })
            
})

function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){

    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
 
    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);    
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
    
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; 
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price)
    }else{
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <i class="fas fa-times-circle" onclick="removeItem(event);"></i>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>

            <div class="price">$${item.price}</div>
            
            <div class="quantity">
                
                    <span>${item.inCart}</span>
                
            </div> 
            
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `;
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">$${cartCost},00</h4>
        </div>
        `;
    }
}

onloadCartNumbers();
displayCart();


function removeItem(event) {
    var buttonClicked = event.target
    var trimmed = event.target.parentElement.innerText;
    console.log(trimmed)
    var pArr = JSON.parse(localStorage.getItem('productsInCart'));
    var incart = 0;
    var price = 0;
    Object.values(pArr).map(item => {
        if(trimmed == item.name){
            var pArr2 = item.tag   
            incart = item.inCart
            price = item.price         
            delete pArr[pArr2]
            console.log(pArr);
        }
    });
    var cartnum = localStorage.getItem('cartNumbers');
    var cartcost = localStorage.getItem('totalCost');
    cartnum = cartnum - incart;
    cartcost = cartcost -(incart * price);
    localStorage.setItem('cartNumbers', cartnum);
    localStorage.setItem('totalCost', cartcost);
    localStorage.setItem('productsInCart', JSON.stringify(pArr));
    window.open('cart.html','_self')
}



function logout(){
    sessionStorage.removeItem('AuthenticationState');
    localStorage.removeItem('productsInCart');
    localStorage.removeItem('totalCost');
    localStorage.removeItem('cartNumbers');
    window.open('index.html','_self');
}



function purchase(){
    alert('Thanks for Buying');
    localStorage.removeItem('productsInCart');
    localStorage.removeItem('totalCost');
    localStorage.removeItem('cartNumbers');
    window.open('index.html','_self');
}