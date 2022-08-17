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
            document.getElementById("courseName").innerHTML = "<b>" + json.courseName + "</b>";
            document.getElementById("creditHours").innerHTML = "<em>" + json.creditHours + " credit-hours</em>";
        }
        else if (this.readyState == 4 && this.status == 500){
            document.getElementById("container").innerHTML = "<div>\n" +
                "            <h1>Something went wrong...</h1>\n" +
                "            <p>Something went wrong when attempting to get information on your quiz. Please try again later, or contact 1StopConEd.</p>\n" +
                "        </div>";
        }
        else if (this.readyState == 4 && (this.status == 400)){
            const json = JSON.parse(this.responseText);
            if(json.error === "security"){
                document.getElementById("container").innerHTML = "<div>\n" +
                    "            <h1>Something went wrong...</h1>\n" +
                    "            <p>A necessary security check failed when attempting to load this quiz. Please try again, or contact 1StopConEd.</p>\n" +
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
            else if (json.error === "passed") {
                document.getElementById("container").innerHTML = "<div>\n" +
                    "            <h1>You've already passed this quiz!</h1>\n" +
                    "            <p>This quiz has already been passed, and you do not need to take it again. If you have not been already, you should be certified soon.</p>\n" +
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

    xhttp.open("GET", "http://localhost:7000/get-purchase-info?confNum=" + urlParams.get("confNum") + "&security=" + urlParams.get("security"), true);
    xhttp.send();

    document.getElementById("form-submit").addEventListener("click", function() {
        window.location.replace("file:///C:/Users/letsd/Documents/OneStopConed/onestopconed/OneStopConEd%20Public/src/quiz.html?confNum=" + urlParams.get("confNum") + "&security=" + urlParams.get("security"));
    });
}