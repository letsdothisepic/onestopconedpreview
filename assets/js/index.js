window.onload = function () {
    document.getElementById("successText").hidden = true;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText)
            let htmlBuffer = [];
            for(let i = 1; i<=6; i++){
                htmlBuffer.push("<div class=\"col-lg-2 col-md-3 col-sm-6 col-6\">\n" +
                    "                        <a href=\"#h\" class=\"mini-box\">\n" +
                    "                            <i><img src=\"assets/images/work-process-item-01.png\" alt=\"\"></i>\n" +
                    "                            <strong>" + json[i.toString()]["name"] + "</strong>\n" +
                    "                            <span>" + json[i.toString()]["featuredText"] + "</span>\n" +
                    "                        </a>\n" +
                    "                    </div>")
            }
            document.getElementById("featuredCourses").innerHTML = htmlBuffer.join("\n");
        }
        }
    xhttp.open("GET", "http://159.65.237.77:7000/get-featured-courses", true);
    xhttp.send();

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText)
            document.getElementById("coursesCounter").innerText = json["courses"]
            document.getElementById("coursesSoldCounter").innerText = json["coursesSold"]
            document.getElementById("happyClientsCounter").innerText = json["clients"]
            document.getElementById("creditHoursCounter").innerText = json["creditHours"]
            document.getElementById("yearsCounter").innerText = json["years"]
            // Home number counterup
        }
    }
    xhttp2.open("GET", "http://159.65.237.77:7000/get-statistics")
    xhttp2.send()

}

document.getElementById("form-submit").addEventListener("click", function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("successText").hidden = false;
        }
    }
    let json = {}
    json["name"] = document.getElementById("name").value
    json["email"] = document.getElementById("email").value
    json["message"] = document.getElementById("message").value
    xhttp.open("POST", "http://159.65.237.77:7000/contact-us-submission")
    xhttp.send(JSON.stringify(json));
})


