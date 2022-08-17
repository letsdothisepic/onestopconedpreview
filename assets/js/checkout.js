window.onload = function(){
    if(sessionStorage.getItem("cart") == null){
        sessionStorage.setItem("cart", '{"items":[], "total": 0}')
    }
    document.getElementById("form-submit").addEventListener("click", function() {
        var xhttp = new XMLHttpRequest();
        let body = {}
        const courses = JSON.parse(sessionStorage.getItem("cart"))["items"]
        let items = []
        for(let x in courses){
            items.push(parseInt(courses[x]))
        }
        console.log(document.getElementById("tel").checkValidity())
        if(!document.getElementById("name").checkValidity() || document.getElementById("name").value.length === 0){
            document.getElementById("wentWrong").innerText = "Full Name"
            document.getElementById("warning").hidden = false;
            return;
        }
        else if(!document.getElementById("email").checkValidity() || document.getElementById("email").value.length === 0){
            document.getElementById("wentWrong").innerText = "Email Address"
            document.getElementById("warning").hidden = false;
            return;
        }
        else if(!document.getElementById("tel").checkValidity() || document.getElementById("tel").value <= 0){
            document.getElementById("wentWrong").innerText = "Phone Number"
            document.getElementById("warning").hidden = false;
            return;
        }
        else if(!document.getElementById("street-address").checkValidity() || document.getElementById("street-address").value.length === 0){
            document.getElementById("wentWrong").innerText = "Street Address"
            document.getElementById("warning").hidden = false;
            return;
        }
        else if(!document.getElementById("address-level1").checkValidity() || document.getElementById("address-level1").value.length === 0){
            document.getElementById("wentWrong").innerText = "State"
            document.getElementById("warning").hidden = false;
            return;
        }
        else if(!document.getElementById("address-level2").checkValidity() || document.getElementById("address-level2").value.length === 0){
            document.getElementById("wentWrong").innerText = "City"
            document.getElementById("warning").hidden = false;
            return;
        }
        else if(!document.getElementById("postal-code").checkValidity() || document.getElementById("postal-code").value <= 0){
            document.getElementById("wentWrong").innerText = "ZIP Code"
            document.getElementById("warning").hidden = false;
            return;
        }
        else if(JSON.parse(window.sessionStorage.getItem("cart"))["items"].length === 0 ){
            document.getElementById("cartEmptyWarning").hidden = false;
            return;
        }
        body["courseIDs"] = items
        body["fullName"] = document.getElementById("name").value
        body["email"] = document.getElementById("email").value
        body["streetAddress"] = document.getElementById("street-address").value
        body["city"] = document.getElementById("address-level2").value
        body["state"] = document.getElementById("address-level1").value
        body["zipcode"] = document.getElementById("postal-code").value
        body["phoneNumber"] = document.getElementById("tel").value
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const json = JSON.parse(this.responseText)
                window.location.assign(json["url"])
            }
        }
        xhttp.open("POST", "http://159.65.237.77:7000/create-checkout-session", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(body));
    })
    document.getElementById("empty-cart").addEventListener("click", function() {
        sessionStorage.setItem("cart", '{"items":[], "total": 0}')
        refreshCartDisplay()
    })
    refreshCartDisplay()
}

function refreshCartDisplay(){
    const cartJSON = JSON.parse(sessionStorage.getItem("cart"))
    document.getElementById("cartText").innerHTML = "<b>Cart</b> (" + cartJSON["items"].length + ")"
    if(cartJSON["items"].length === 0){
        document.getElementById("coursesPanel").innerHTML = "<h3>Your cart is empty.</h3><p>Visit the courses page to add items to your cart.</p>"
        document.getElementById("subtotal").hidden = true
        document.getElementById("empty-cart").hidden = true
        document.getElementById("feesSection").hidden = true
    }
    else{
        let htmlBuffer = [];
        let subtotal = 0
        let items = cartJSON["items"]
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let fees = 0;
                let courses = JSON.parse(this.responseText)
                for (let x in items){
                    let current = items[x]
                    let info = courses[current]
                    let creditHoursText;
                    if(info["elective_hours"] === 0){
                        creditHoursText =  + (info["legal_hours"]) + " credit-hours (" + info["legal_hours"] + " Legal)";
                    }
                    else{
                        creditHoursText =  + (info["legal_hours"] + info["elective_hours"]) + " credit-hours (" + info["legal_hours"] + " Legal/" + info["elective_hours"] + " Elective)";
                    }
                    htmlBuffer.push("<div class=\"courseInfo\">\n" +
                        "<img class=\"courseIcon\" src=\"/assets/images/courselogos/" + info["icon_name"] + "\" alt=\"course icon\" height=\"100\" width=\"100\"/>\n" +
                        "<div class=\"courseTitleInfo\">\n" +
                        "<p class=\"courseTitleInfoText\"><b>" + info["name"] + "</b></p>\n" +
                        "<p class=\"courseTitleInfoText\"><em>" + creditHoursText + "</em></p>\n" +
                        "<p class=\"courseTitleInfoText\"><b>$" + (info["priceCents"] / 100.0) + "</b></p></div>\n" +
                        "            <div data-id='" + info["course_id"] + "' data-pricecents='" + info["priceCents"] + "' class=\"deleteButton\">\n" +
                        "              <i class=\"fa-solid fa-trash-can trashIcon fa-xl\"></i>\n" +
                        "            </div></div>")
                    subtotal = subtotal + parseInt(info["priceCents"]) + 100
                    fees = fees + 1.00
                }
                document.getElementById("coursesPanel").innerHTML = htmlBuffer.join("\n")
                document.getElementById("subtotal").innerHTML = "Subtotal: <b>$" + ((subtotal) / 100.0) + "</b>"
                document.getElementById("feesSection").hidden = false
                document.getElementById("fees").innerText = "$" + fees + ".00"
            }


            let els = document.getElementsByClassName("deleteButton");
            for(let i = 0; i < els.length; i++)
            {
                els[i].addEventListener("click", function(){
                    const cartJSON = JSON.parse(sessionStorage.getItem("cart"))
                    let currentCart = JSON.parse(window.sessionStorage.getItem("cart"));
                    let items = currentCart["items"];
                    let totalPrice = currentCart["total"]
                    let newTotal = totalPrice - parseInt(this.dataset.pricecents)
                    let newItems = []
                    for (let i = 0; i < items.length; i++) {
                        if (!(items[i] === this.dataset.id)) {
                            newItems.push(items[i])
                        }
                    }
                    let resultJSON = {};
                    if(newTotal < 0) {newTotal = 0}
                    resultJSON["total"] = newTotal;
                    resultJSON["items"] = newItems;
                    console.log(resultJSON)
                    window.sessionStorage.setItem("cart", JSON.stringify(resultJSON))
                    refreshCartDisplay()
                })
            }

        }
        xhttp.open("GET", "http://159.65.237.77:7000/get-all-active-courses-indexed", true);
        xhttp.send();

    }
}