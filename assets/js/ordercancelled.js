window.onload = function (){
    document.getElementById("empty-cart").addEventListener("click", function(){
        if(confirm("Are you sure you want to empty your cart?")){
            sessionStorage.setItem("cart", '{"items":[], "total": 0}')
            this.hidden = true;
        }
    })
    document.getElementById("return").addEventListener("click", function(){
        window.location.assign("https://1stopconed.com/courses.html")
    })
    document.getElementById("checkout").addEventListener("click", function(){
        window.location.assign("https://1stopconed.com/checkout.html")
    })
}