window.onload = function() {
    document.getElementById("loader").hidden = true;
    document.getElementById("bepatient").hidden = true;
    document.getElementById("form-submit").addEventListener("click", function(){
        this.hidden = true;
        document.getElementById("loader").hidden = false;
        document.getElementById("bepatient").hidden = false;
        let xhttp = new XMLHttpRequest();
        let body = {}
        body["email"] = document.getElementById("email").value
        if(!validateEmail(document.getElementById("email").value)){
            this.hidden = false;
            document.getElementById("results").innerHTML = "<h3 class=\"error\">Invalid Email</h3>\n" +
                "        <p class=\"error\">This is not a valid email address. Please try again.</p>"
            return
        }
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                this.hidden = false;
                document.getElementById("loader").hidden = true;
                document.getElementById("bepatient").hidden = true;
                document.getElementById("results").innerHTML = "<h3>Success!</h3>\n" +
                    "        <p>Your email(s) have been re-sent. If you still are having issues, please contact 1StopConEd.</p>"
            }
            else if (this.readyState == 4 && this.status == 400){
                this.hidden = false;
                document.getElementById("loader").hidden = true;
                document.getElementById("bepatient").hidden = true;
                document.getElementById("results").innerHTML = "<h3 class=\"error\">Information not found</h3>\n" +
                    "        <p class=\"error\">No purchases could be found from that email.</p>"
            }
            else if (this.readyState == 4){
                this.hidden = false;
                document.getElementById("loader").hidden = true;
                document.getElementById("bepatient").hidden = true;
                document.getElementById("results").innerHTML = "<h3 class=\"error\">Something went wrong</h3>\n" +
                    "        <p class=\"error\">An internal server error occured when attempting to load your information. Please try again later, or contact 1StopConEd.</p>"
            }
        }
        xhttp.open("POST", "http://159.65.237.77:7000/resend-email", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(body));
    })
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/
        );
};