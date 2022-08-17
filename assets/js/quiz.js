let quizQuestions;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
let answers = [];
let ableToLeave = false;
window.onload = function () {
    window.scroll({top: 0});
    getQuiz();
};

window.onbeforeunload = function (e) {
    if(!ableToLeave){
        e = e || window.event;

        // For IE and Firefox prior to version 4
        if (e) {
            e.returnValue = 'Sure?';
        }

        // For Safari
        return 'Sure?';
    }
};

function getQuiz(){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.responseText);
            quizQuestions = json;
            let htmlBuffer = []
            for(let i = 1; i <= 10; i++){
                let current = json["q" + i];
                htmlBuffer.push("<div class=\"question\">\n                <p>" + i + ".  " + current.prompt + "</p>\n")
                if(current.hasOwnProperty("A")){
                    htmlBuffer.push("<input type=\"radio\" name=\"q" + i + "\" value=\"A\"><label>" + current.A + "</label><br>")
                }
                if(current.hasOwnProperty("B")){
                    htmlBuffer.push("<input type=\"radio\" name=\"q" + i + "\" value=\"B\"><label>" + current.B + "</label><br>")
                }
                if(current.hasOwnProperty("C")){
                    htmlBuffer.push("<input type=\"radio\" name=\"q" + i + "\" value=\"C\"><label>" + current.C + "</label><br>")
                }
                if(current.hasOwnProperty("D")){
                    htmlBuffer.push("<input type=\"radio\" name=\"q" + i + "\" value=\"D\"><label>" + current.D + "</label><br>")
                }
                if(current.hasOwnProperty("E")){
                    htmlBuffer.push("<input type=\"radio\" name=\"q" + i + "\" value=\"E\"><label>" + current.E + "</label><br>")
                }
                htmlBuffer.push("</div>")
            }
            htmlBuffer.push("<div class='question'><p>I certify that I have personally read all of the course material, that I personally completed the above quiz, and that I was personally engaged in the course for at least fifty minutes for each credit hour of material before taking the quiz.</p>\n            <input type=\"checkbox\" name=\"check\" required><label for=\"check\">Yes, I certify that the above requirements have been met.</label>\n                </div>\n            " +
                "<div class=\"question\">\n" +
                "<input type=\"number\" name=\"licnum\" id='licnum'><label for=\"licnum\">LARA License Number</label>" +
                "<p><em>If you don't know your LARA number, <a href='https://aca-prod.accela.com/MILARA/GeneralProperty/PropertyLookUp.aspx?isLicensee=Y&TabName=APO'  target=\"_blank\">click here</a> to look it up.</em></p>" +
                "</div>" +
                "<div class=\"question\">\n" +
                "<input type=\"number\" name=\"SSN\" id='ssn'><label for=\"SSN\">Last 4 digits of Social Security Number (required by LARA for course completion reporting validation)</label>\n" +
                "</div>\n" +
                "<div class='question'>\n" +
                "<input type=\"text\" name=\"legalname\" id='legalname'><label for=\"legalname\">Your Name (as it appears on your license)</label>\n" +
                "</div>" +
                "<button type=\"button\" id=\"form-submit\" class=\"main-button continuebutton\"><b>Submit Quiz</b></button>")
            document.getElementById("quiz").innerHTML = htmlBuffer.join("");
            document.getElementById("form-submit").addEventListener("click", function(){
                submitQuiz();
            })
        }
        else if(this.readyState == 4 && this.status == 400){
            document.getElementById("quiz").innerHTML = "<h2 align=\"center\">Something went wrong.</h2>\n<p align=\"center\">Our servers rejected the request to take this quiz. You may have already completed it, or something went wrong. If you have questions, contact 1StopConEd.</p>";
        }
        else if(this.readyState == 4){
            document.getElementById("quiz").innerHTML = "<h2 align=\"center\">Something went wrong.</h2>\n<p align=\"center\">Something went wrong when attempting to load your quiz. Please try again, or contact 1StopConEd.</p>";
        }
    }
    xhttp.open("GET", "http://159.65.237.77:7000/get-quiz-material?confNum=" + urlParams.get("confNum") + "&security=" + urlParams.get("security"), true);
    xhttp.send();
}

function submitQuiz(){
    let response = {};
    let valid = true;
    for(let i=1; i<=10; i++){
        if(valid){
            var ele = document.getElementsByName('q' + i);
            let currentValid = false;
            for(let n = 0; n<ele.length; n++){
                if(ele[n].checked){
                    response['q' + i] = ele[n].value;
                    answers[i] = ele[n].value;
                    currentValid = true;
                }
            }
            if(!currentValid){
                valid = false;
                alert("You did not provide an answer for question " + i + ".")
            }
        }
    }
    if(!document.getElementsByName("check")[0].checked && valid){
        valid = false;
        alert("You must certify the statement at the end of the quiz to continue.")
    }
    const licnum = document.getElementById('licnum').value;
    const ssn = document.getElementById('ssn').value
    const name = document.getElementById('legalname').value
    if(ssn === "") {valid = false; alert("You must enter the last 4 of your SSN to submit the quiz.")}
    if(ssn > 9999) {valid = false; alert("You entered more than 4 digits in the SSN field. Please only provide the last 4 digits.")}
    if(licnum === "") {valid = false; alert("You must enter your LARA license number to submit the quiz.")}
    var numString = licnum.toString()
    if (numString.substring(0,4) === "6505") {valid=false; alert("You entered a license number beginning in 6505, which indicates a business license. Please find your individual realtor license, and try again.")}
    if(numString.length !== 10) {valid=false; alert("LARA number entered is not 10 digits. Please try again.")}
    if(valid){
        response['ssn'] = ssn;
        response['laranum'] = licnum;
        response['name'] = name;
        //submit the quiz
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const json = JSON.parse(this.responseText);
                if(json.pass === 1){
                    ableToLeave = true;
                    window.location.assign("https://www.1stopconed.com/congratulations.html"); //congratulations page
                }
                else{
                    let current = "<h1 align=\"center\"><b>Sorry, you didn't pass this time.</b></h1>\n" +
                        "  <h2>Your score: <b>" + json.correct + "/10</b></h2>\n" +
                        "  <p>Sorry, but you didn't pass the quiz this time. Check below to see which questions you were unable to answer, study the material relating to those questions, and try again.</p>"
                    for(let i=1; i<=10; i++){
                        if(json["q" + i] === 0){
                            //got wrong, so we show it here
                            current = current + "<div class='question'><p>" + i + ". " + quizQuestions["q" + i]["prompt"] + "</p>"
                            if(quizQuestions["q" + i].hasOwnProperty("A")){
                                if(answers[i] === "A"){
                                    current = current + "<p style='color: red'>&#10060;<strong>" + quizQuestions["q" + i]["A"] + "</strong></p>";
                                }
                                else{
                                    current = current + "<p>&#10068;" + quizQuestions["q" + i]["A"] + "</p>";
                                }
                            }
                            if(quizQuestions["q" + i].hasOwnProperty("B")){
                                if(answers[i] === "B"){
                                    current = current + "<p style='color: red'>&#10060;<strong>" + quizQuestions["q" + i]["B"] + "</strong></p>";
                                }
                                else{
                                    current = current + "<p>&#10068;" + quizQuestions["q" + i]["B"] + "</p>";
                                }
                            }
                            if(quizQuestions["q" + i].hasOwnProperty("C")){
                                if(answers[i] === "C"){
                                    current = current + "<p style='color: red'>&#10060;<strong>" + quizQuestions["q" + i]["C"] + "</strong></p>";
                                }
                                else{
                                    current = current + "<p>&#10068;" + quizQuestions["q" + i]["C"] + "</p>";
                                }
                            }
                            if(quizQuestions["q" + i].hasOwnProperty("D")){
                                if(answers[i] === "D"){
                                    current = current + "<p style='color: red'>&#10060;<strong>" + quizQuestions["q" + i]["D"] + "</strong></p>";
                                }
                                else{
                                    current = current + "<p>&#10068;" + quizQuestions["q" + i]["D"] + "</p>";
                                }
                            }
                            if(quizQuestions["q" + i].hasOwnProperty("E")){
                                if(answers[i] === "E"){
                                    current = current + "<p style='color: red'>&#10060;<strong>" + quizQuestions["q" + i]["E"] + "</strong></p>";
                                }
                                else{
                                    current = current + "<p>&#10068;" + quizQuestions["q" + i]["E"] + "</p>";
                                }
                            }
                            current = current + "</div>";
                        }
                    }
                    current = current + "<button type=\"button\" id=\"try-again\" class=\"main-button continuebutton\"><b>Try Again</b></button>"
                    document.getElementById("box").innerHTML = current;
                    document.getElementById("try-again").addEventListener("click", function() {
                        ableToLeave = true;
                        document.location.reload();
                    })
                    window.scroll({top: 0});
                }
            }
        }
        xhttp2.open("POST", "http://159.65.237.77:7000/submit-quiz?confNum=" + urlParams.get("confNum") + "&security=" + urlParams.get("security"), true);
        xhttp2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp2.send(JSON.stringify(response));
    }
}
