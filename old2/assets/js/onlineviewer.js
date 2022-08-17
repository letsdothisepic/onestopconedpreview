window.onload = function () {
    updateInformation()
};

function updateInformation() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.responseText);
            PDFObject.embed("C:\\Users\\letsd\\Documents\\OneStopConed\\onestopconedbackend\\src\\main\\resources\\coursePDFs\\" + json.id + ".pdf", "#content")
        }
        else if (this.readyState == 4 && this.status == 500){
            document.getElementById("content").innerHTML = "<div>\n" +
                "            <h1>Something went wrong...</h1>\n" +
                "            <p>Something went wrong when attempting to get information on your course. Please try again later, or contact 1StopConEd.</p>\n" +
                "        </div>";
        }
        else if (this.readyState == 4 && (this.status == 400)){
            const json = JSON.parse(this.responseText);
            if(json.error === "security"){
                document.getElementById("content").innerHTML = "<div>\n" +
                    "            <h1>Something went wrong...</h1>\n" +
                    "            <p>A necessary security check failed when attempting to load this course. Please try again, or contact 1StopConEd.</p>\n" +
                    "        </div>";
            }
            else if (json.error === "numberformat") {
                document.getElementById("content").innerHTML = "<div>\n" +
                    "            <h1>Something went wrong...</h1>\n" +
                    "            <p>Our servers weren't able to read the confirmation number provided in the link. Please try again, or contact 1StopConEd.</p>\n" +
                    "        </div>";
            }
            else if (json.error === "notfound") {
                document.getElementById("content").innerHTML = "<div>\n" +
                    "            <h1>Something went wrong...</h1>\n" +
                    "            <p>Our servers couldn't find any records of the confirmation number provided. Please try again, or contact 1StopConEd.</p>\n" +
                    "        </div>";
            }
            else{
                document.getElementById("content").innerHTML = "<div>\n" +
                    "            <h1>Something went wrong...</h1>\n" +
                    "            <p>A necessary security check failed when attempting to load this quiz. Please try again, or contact 1StopConEd.</p>\n" +
                    "        </div>";
            }
        }
    };

    xhttp.open("GET", "http://localhost:7000/get-access-info?confNum=" + urlParams.get("confNum") + "&security=" + urlParams.get("security"), true);
    xhttp.send();
}