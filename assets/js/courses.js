window.onload = function () {
    console.log("top")
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
            const json = JSON.parse('{"result":[{"course_id":106406,"short_description":"The ultimate course, covering wells, pests, case law, and much more","legal_hours":10,"name":"Complete 18-Hour Course","elective_hours":8,"priceCents":"12999","long_description":"This 18-credit hour course is designed for Michigan real estate salespersons and brokers looking to satisfy their required real estate continuing education. Specifically, this course provides 10 hours of \u201clegal\u201d credit and 8 hours of \u201celective\u201d credit, for a grand total of 18 hours, which is the amount of real estate continuing education hours that must be completed by October 31, 2021. This course is fully approved by CE Marketplace and provides the total number of continuing education hours required to renew broker and salesperson licenses with the Michigan Department of Licensing and Regulatory Affairs (LARA). A variety of topics are presented in this course, including an overview of wells (ground water) and septic systems; an overview of household pests, pest control and pesticides; Michigan laws and cases related to real estate; Fair Housing Act updates and claims involving sexual harassment; plus, a bonus of hot topics in Michigan. This course is CE Marketplace Certified and GUARANTEED to provide 18 credit hours of continuing education as required by LARA.","icon_name":"loading.png"},{"course_id":106543,"short_description":"An overview of how renewable energy applies to real estate","legal_hours":2,"name":"Renewable Energy in Real Estate","elective_hours":4,"priceCents":"4999","long_description":"This course provides 6 credit hours of Michigan real estate continuing education, including 2 hours of required \\"legal\\" continuing education and 4 \\"elective\\" hours.  Renewable energy is a hot topic in real estate. This course provides an overview of the variety of renewable energy sources and its application to real estate. This course also provides 3 hours of the required legal update, specifically involving Fair Housing cases in everyday situations. This course is CE Marketplace Certified and GUARANTEED to provide 6 credit hours of real estate continuing education, including 2 hours of law/legal update, as required by LARA.","icon_name":"loading.png"},{"course_id":106545,"short_description":"How wells and septic systems work, and how they impact real estate","legal_hours":2,"name":"What to Know about Septic Systems and Wells","elective_hours":4,"priceCents":"4999","long_description":"This course provides 6 credit hours of Michigan real estate continuing education, including 2 hours of required \\"legal\\" continuing education and 4 \\"elective\\" hours. Clients may have questions regarding septic systems and wells serving certain homes, which is why this course covers topics such as how a well and septic system work, types, inspection and evaluation of these systems, and more. Information regarding use, maintenance, and repairs is extremely important when deciding whether to purchase a house that depends on a well and/or septic system. This course also includes a legal update involving the analysis of recent Michigan cases, new and amended laws involving real estate, and interesting updates involving the Fair Housing Act. This course is CE Marketplace Certified and GUARANTEED to provide 6 credit hours of real estate continuing education, including 2 hours of law/legal update, as required by LARA.","icon_name":"loading.png"},{"course_id":106547,"short_description":"A basic overview of landlord/tenant law","legal_hours":6,"name":"Property Ownership and Landlord/Tenant Overview","elective_hours":0,"priceCents":"4999","long_description":"This course provides 6 credit hours of \\"legal\\" Michigan real estate continuing education.  Are you a landlord or a tenant? Or do you just want a refresher when it comes to property law? Either way or both, this course is for you. This course provides a basic overview of landlord/tenant law, as well as the fundamentals of property law. This 6-hour course is made of the following 2 courses, which together provide 6 hours of required \u201clegal\u201d continuing education: Landlord-Tenant Law and Property Law Primer. This course is CE Marketplace Certified and GUARANTEED to provide 6 credit hours of law/legal update continuing education as required by LARA.","icon_name":"loading.png"},{"course_id":106548,"short_description":"How Radon impacts real estate transactions in Michigan","legal_hours":2,"name":"Radon Basics","elective_hours":4,"priceCents":"4999","long_description":"This course provides 6 credit hours of Michigan real estate continuing education, including 2 hours of required \\"legal\\" continuing education and 4 \\"elective\\" hours. You\u2019ve probably heard about radon, but do you know what it is and how it can affect you? After taking this Michigan real estate continuing course you will have a good understanding of radon and how it impacts real estate transactions in Michigan. This course also includes a separate 2-hour legal update with cases involving court cases that decide everyday real estate issues that fulfills your required Michigan legal update hours.   This course is CE Marketplace Certified and GUARANTEED to provide 6 credit hours of real estate continuing education, including 2 hours of law/legal update, as required by LARA.","icon_name":"radon_basics.png"},{"course_id":107562,"short_description":"Hot topics and new changes from 2022 in Michigan Real Estate","legal_hours":6,"name":"Ultimate 2022 6-Hour Legal","elective_hours":0,"priceCents":"4999","long_description":"This course provides 6 credit hours of \\"legal\\" Michigan real estate continuing education. This 2022 6-hour legal course covers important new and amended Michigan laws related to real estate, as well as recent Michigan cases involving adverse possession and real estate generally. This course also presents interesting updates involving the Fair Housing Act, plus a bonus of hot topics involving various interesting real estate matters. This course is organized in a way that makes learning complex matters simple. As real estate professionals, it is important to be knowledgeable about recent statutes, cases, and the application of laws to facts. At the conclusion of this course, students will have a solid understanding of the most recent legal updates involving typical real estate issues. This course is CE Marketplace Certified and GUARANTEED to provide 6 credit hours of law/legal update continuing education as required by LARA.","icon_name":"loading.png"}]}');
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
