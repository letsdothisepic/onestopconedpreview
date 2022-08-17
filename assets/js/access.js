window.onload = function () {
    updateInformation()
};

function updateInformation() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)

    document.getElementById("confirmationNum").innerHTML = "Confirmation #: <b>" + urlParams.get("confNum") + "</b>"

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.responseText);

            document.getElementById("courseIcon").setAttribute("src", "/assets/images/courselogos/" + json.courseLogo);
            document.getElementById("customerInfo").innerHTML = json.nameAndAddress;
            document.getElementById("purchaseDate").innerHTML = "<em>Purchased on " + timeConverter(json.timestamp) + "</em>";
            document.getElementById("courseName").innerHTML = "<b>" + json.courseName + "</b>";
            let creditHoursText;
            if(json["electiveHours"] === 0){
                creditHoursText =  + (json["legalHours"]) + " credit-hours (" + json["legalHours"] + " Legal)";
            }
            else{
                creditHoursText =  + (json["legalHours"] + json["electiveHours"]) + " credit-hours (" + json["legalHours"] + " Legal/" + json["electiveHours"] + " Elective)";
            }
            document.getElementById("creditHours").innerHTML = "<em>" + creditHoursText + "</em>";
            document.getElementById("downloadlink").setAttribute("href", "C:\\Users\\letsd\\Documents\\OneStopConed\\onestopconedbackend\\src\\main\\resources\\coursePDFs\\" + json.id + ".pdf")
            document.getElementById("downloadlink").setAttribute("download", json.courseName + " - 1StopConEd.pdf")
        }
        else if (this.readyState == 4 && this.status == 500){
            document.getElementById("container").innerHTML = "<div>\n" +
                "            <h1>Something went wrong...</h1>\n" +
                "            <p>Something went wrong when attempting to get information on your course. Please try again later, or contact 1StopConEd.</p>\n" +
                "        </div>";
        }
        else if (this.readyState == 4 && (this.status == 400)){
            const json = JSON.parse(this.responseText);
            if(json.error === "security"){
                document.getElementById("container").innerHTML = "<div>\n" +
                    "            <h1>Something went wrong...</h1>\n" +
                    "            <p>A necessary security check failed when attempting to load this course. Please try again, or contact 1StopConEd.</p>\n" +
                    "        </div>";
            }
            else if (json.error === "numberformat") {
                document.getElementById("container").innerHTML = "<div>\n" +
                    "            <h1>Something went wrong...</h1>\n" +
                    "            <p>Our servers weren't able to read the confirmation number provided in the link. Please try again, or contact 1StopConEd.</p>\n" +
                    "        </div>";
            }
            else if (json.error === "notfound") {
                document.getElementById("container").innerHTML = "<div>\n" +
                    "            <h1>Something went wrong...</h1>\n" +
                    "            <p>Our servers couldn't find any records of the confirmation number provided. Please try again, or contact 1StopConEd.</p>\n" +
                    "        </div>";
            }
            else{
                document.getElementById("container").innerHTML = "<div>\n" +
                    "            <h1>Something went wrong...</h1>\n" +
                    "            <p>A necessary security check failed when attempting to load this quiz. Please try again, or contact 1StopConEd.</p>\n" +
                    "        </div>";
            }
        }
    };

    xhttp.open("GET", "http://159.65.237.77:7000/get-access-info?confNum=" + urlParams.get("confNum") + "&security=" + urlParams.get("security"), true);
    xhttp.send();

    document.getElementById("viewOnline").addEventListener("click", function(){
        //view online
    })
    document.getElementById("startquiz").addEventListener("click", function(){
        window.location.assign("file:///C:/Users/letsd/Documents/OneStopConed/onestopconed/OneStopConEd%20Public/src/pre-quiz.html?confNum=" + urlParams.get("confNum") + "&security=" + urlParams.get("security"));
    })
}

function timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    return month + " " + date + ", " + year;
}