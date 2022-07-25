window.onload = function(){
    console.log("runs")
    document.getElementById("form-submit").addEventListener("click", function() {
        console.log("clicked")
        var xhttp = new XMLHttpRequest();
        let body = {}
        const courses = JSON.parse(sessionStorage.getItem("cart"))["items"]
        let items = []
        for(let x in courses){
            items.push(parseInt(courses[x]))
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
        xhttp.open("POST", "http://localhost:7000/create-checkout-session", true);
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
    }
    else{
        let htmlBuffer = [];
        let subtotal = 0
        let items = cartJSON["items"]
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let courses = JSON.parse(this.responseText)
                console.log(courses)
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
                    console.log(info)
                    htmlBuffer.push("<div class=\"courseInfo\">\n" +
                        "<img class=\"courseIcon\" src=\"/assets/images/courselogos/" + info["icon_name"] + "\" alt=\"course icon\" height=\"100\" width=\"100\"/>\n" +
                        "<div class=\"courseTitleInfo\">\n" +
                        "<p class=\"courseTitleInfoText\"><b>" + info["name"] + "</b></p>\n" +
                        "<p class=\"courseTitleInfoText\"><em>" + creditHoursText + "</em></p>\n" +
                        "<p class=\"courseTitleInfoText\"><b>$" + (info["priceCents"] / 100.0) + "</b></p>\n" +
                        "</div>\n" +
                        "<p class=\"courseDescription\">" + info["short_description"] + "</p>\n" +
                        "</div>")
                    subtotal = subtotal + parseInt(info["priceCents"])
                }
            }
            document.getElementById("coursesPanel").innerHTML = htmlBuffer.join("\n")
            document.getElementById("subtotal").innerHTML = "Subtotal: <b>$" + (subtotal / 100.0) + "</b>"
        }
        xhttp.open("GET", "http://localhost:7000/get-all-active-courses-indexed", true);
        xhttp.send();

    }
}