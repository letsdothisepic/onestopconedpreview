let quizQuestions;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
let answers = [];
window.onload = function () {
    window.scroll({top: 0});
};

window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Sure?';
    }

    // For Safari
    return 'Sure?';
};

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
    if(ssn === "") {valid = false; alert("You must enter the last 4 of your SSN to submit the quiz.")}
    if(ssn > 9999) {valid = false; alert("You entered more than 4 digits in the SSN field. Please only provide the last 4 digits.")}
    if(licnum === "") {valid = false; alert("You must enter your LARA license number to submit the quiz.")}
    var numString = licnum.toString()
    if (numString.substring(0,4) === "6505") {valid=false; alert("You entered a license number beginning in 6505, which indicates a business license. Please find your individual realtor license, and try again.")}
    if(numString.length !== 10) {valid=false; alert("LARA number entered is not 10 digits. Please try again.")}
    if(valid){
        response['ssn'] = ssn;
        response['laranum'] = licnum;
        //submit the quiz
                const json = JSON.parse("{\"q1\":1,\"q2\":0,\"q10\":0,\"q3\":0,\"q4\":1,\"q5\":0,\"correct\":4,\"q6\":1,\"pass\":0,\"q7\":0,\"q8\":1,\"q9\":0}");
                if(json.pass === 1){
                    window.location.assign("https://www.1stopconed.com/congratulations.html"); //congratulations page
                }
                else{
                    let current = "<h1 align=\"center\"><b>Sorry, you didn't pass this time.</b></h1>\n" +
                        "  <h2>Your score: <b>" + json.correct + "/10</b></h2>\n" +
                        "  <p>Sorry, but you didn't pass the quiz this time. Check below to see which questions you were unable to answer, study the material relating to those questions, and try again.</p>" +
                        "<p>Note: <em>The quiz would be graded on the server in the production build, but this is an example of a failing quiz. To see a pass, click <a href='congratulations.html'>here.</a></em></p>"
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
                        document.location.reload();
                    })
                    window.scroll({top: 0});
                }
    }
}
