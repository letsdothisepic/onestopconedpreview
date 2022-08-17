window.onload = function () {
    if (window.sessionStorage.hasOwnProperty("cart")) {
        let currentCart = JSON.parse(window.sessionStorage.getItem("cart"))
        document.getElementById("cartcount").innerText = currentCart["items"].length
        document.getElementById("cartprice").innerText = "$" + (currentCart["total"] / 100.0)
        if (currentCart["items"].length === 0) {
            console.log("no cart")
            document.getElementById("cartCountIcon").hidden = true
            document.getElementById("cartSubtotal").hidden = true
        }
        else{
            document.getElementById("cartCountIcon").hidden = false
            document.getElementById("cartSubtotal").hidden = false
        }
    } else {
        console.log("no cart prop")
        sessionStorage.setItem("cart", '{"items":[], "total": 0}')
        document.getElementById("cartCountIcon").hidden = true
        document.getElementById("cartSubtotal").hidden = true
    }
    getCourses();

};

function getCourses() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.responseText);
            let jsonArray = json.result;
            let htmlBuffer = []
            const cart = JSON.parse(sessionStorage.getItem("cart"))["items"]
            for (let x in jsonArray) {
                let item = jsonArray[x]
                let creditHoursText;
                if(item["elective_hours"] === 0){
                    creditHoursText =  + (item["legal_hours"]) + " credit-hours (" + item["legal_hours"] + " Legal)";
                }
                else{
                    creditHoursText =  + (item["legal_hours"] + item["elective_hours"]) + " credit-hours (" + item["legal_hours"] + " Legal/" + item["elective_hours"] + " Elective)";
                }
                if(cart.includes(item["course_id"].toString())){
                    htmlBuffer.push("<div class=\"col-lg-6\" data-scroll-reveal=\"enter bottom move 50px over 0.6s after 0.2s\">\n" +
                        "                            <div class=\"course\">\n" +
                        "                                <img src=\"assets/images/courselogos/" + item["icon_name"] + "\" alt=\"\" class=\"courseIcon\" width=\"100\">\n" +
                        "                                <h5 class=\"features-title\"><b>" + item["name"] + "</b></h5>\n" +
                        "                                <h6><em>" + creditHoursText + "</em></h6>\n" +
                        "                                <h5>$" + (item["priceCents"] / 100.0) + "</h5>\n" +
                        "                                <p class=\"leftAlign\"><br>" + item["long_description"] + "</p>\n" +
                        "                                <button type='button' class=\"remove-button-slider\" data-courseid=\"" + item["course_id"] + "\" data-pricecents=\"" + item["priceCents"] + "\"><b>Remove from cart</b></button>\n" +
                        "                                \n" +
                        "                            </div>\n" +
                        "                        </div>\n")
                }
                else {
                    htmlBuffer.push("<div class=\"col-lg-6\" data-scroll-reveal=\"enter bottom move 50px over 0.6s after 0.2s\">\n" +
                        "                            <div class=\"course\">\n" +
                        "                                <img src=\"assets/images/courselogos/" + item["icon_name"] + "\" alt=\"\" class=\"courseIcon\" width=\"100\">\n" +
                        "                                <h5 class=\"features-title\"><b>" + item["name"] + "</b></h5>\n" +
                        "                                <h6><em>" + creditHoursText + "</em></h6>\n" +
                        "                                <h5>$" + (item["priceCents"] / 100.0) + "</h5>\n" +
                        "                                <p class=\"leftAlign\"><br>" + item["long_description"] + "</p>\n" +
                        "                                <button type='button' class=\"main-button-slider\" data-courseid=\"" + item["course_id"] + "\" data-pricecents=\"" + item["priceCents"] + "\"><b>Add to Cart</b></button>\n" +
                        "                                \n" +
                        "                            </div>\n" +
                        "                        </div>\n")
                }
            }
            document.getElementById("coursesPanel").innerHTML = htmlBuffer.join("\n");
            let buttons = document.getElementsByClassName("main-button-slider")
            let removes = document.getElementsByClassName("remove-button-slider")
            for (let i = 0; i < buttons.length; i++) {
                addButtonBehavior(buttons[i])
            }
            for (let i = 0; i < removes.length; i++) {
                addButtonBehavior(removes[i])
            }

        } else if (this.readyState == 4) {
            document.getElementById("coursesPanel").innerHTML = "<p>An error has occured while attempting to load courses. Please try again later, or contact 1StopConEd.</p>";
        }
    }
    xhttp.open("GET", "http://159.65.237.77:7000/get-all-active-courses", true);
    xhttp.send();
}

function addButtonBehavior(button){
    button.addEventListener("click", function () {
        if (this.classList.contains("remove-button-slider")) {
            this.classList.add("main-button-slider")
            this.classList.remove("remove-button-slider")
            this.innerHTML = "<b>Add to cart</b>"

            let currentCart = JSON.parse(window.sessionStorage.getItem("cart"));
            let items = currentCart["items"];
            let totalPrice = currentCart["total"]
            let newTotal = totalPrice - parseInt(this.dataset.pricecents)
            let newItemCount = items.length - 1
            let newItems = []
            for (let i = 0; i < items.length; i++) {
                if (!(items[i] === this.dataset.courseid)) {
                    newItems.push(items[i])
                }
            }
            let resultJSON = {};
            if(newTotal < 0) {newTotal = 0}
            resultJSON["total"] = newTotal;
            resultJSON["items"] = newItems;

            document.getElementById("cartcount").innerText = newItemCount.toString()
            document.getElementById("cartprice").innerText = "$" + (newTotal / 100.0)

            window.sessionStorage.setItem("cart", JSON.stringify(resultJSON))

            if (currentCart["items"].length === 0) {
                document.getElementById("cartCountIcon").hidden = true
                document.getElementById("cartSubtotal").hidden = true
            }

        } else {
            if (!window.sessionStorage.hasOwnProperty("cart")) {
                sessionStorage.setItem("cart", '{"items":[], "total": 0}')
            }
            let currentCart = JSON.parse(window.sessionStorage.getItem("cart"));
            let items = currentCart["items"];
            let totalPrice = currentCart["total"]

            let newTotal = totalPrice + parseInt(this.dataset.pricecents)
            let newItemCount = items.length + 1

            items.push(this.dataset.courseid)

            let resultJSON = {};
            resultJSON["total"] = newTotal;
            resultJSON["items"] = items;

            document.getElementById("cartcount").innerText = newItemCount
            document.getElementById("cartprice").innerText = "$" + (newTotal / 100.0)

            window.sessionStorage.setItem("cart", JSON.stringify(resultJSON))

            document.getElementById("cartCountIcon").hidden = false
            document.getElementById("cartSubtotal").hidden = false

            let cart = document.getElementById("cartIcon")
            cart.classList.add('shake')
            setTimeout(function () {
                cart.classList.remove('shake')
            }, 500)

            this.classList.remove("main-button-slider")
            this.classList.add("remove-button-slider")
            this.innerHTML = "<b>Remove from cart</b>"
        }
    })
}
