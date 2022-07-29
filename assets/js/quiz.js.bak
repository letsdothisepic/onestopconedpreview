let quizQuestions = JSON.parse('{"q1":{"A":"On demand","B":"At a definite time","C":"Both A and B","D":"None of the above","prompt":"The statute of limitations period with respect to a loan depends on whether the note is payable:"},"q2":{"A":"Equitable","B":"Marketable","C":"Encumbered","D":"Unencumbered","E":"None of the above","prompt":"\u201c_______________ title\u201d is one of such character as should assure to the purchaser the quiet and peaceful enjoyment of the property, which must be free from encumbrance."},"q10":{"A":"Mobile Home Act","B":"Manufactured Homes Act","C":"Michigan Mobile Home Commission Act","D":"Michigan Mobile and Manufactured Homes Act","prompt":"Which Michigan Act provides, in part, the process of titling mobile homes?"},"q3":{"A":"Michigan Consumers Protection Act","B":"Michigan Condominium Act","C":"Housing and Urban Development Act","D":"Fair Housing Act","prompt":"What Michigan Act is designed to protect condominium associations and co-owners from condominium developers who attempt to improperly create long-term revenue streams from their condominium projects once that project is completed and control is turned over to the\\nco-owners?"},"q4":{"A":"True","B":"False","prompt":"Based on recent Michigan cases, short-term rentals in Michigan do not constitute a residential use."},"q5":{"A":"Acquiescence for the statutory period","B":"Acquiescence following a dispute and agreement","C":"Acquiescence arising from intention to deed to a marked boundary","D":"Acquiescence under common law","E":"None of the above","prompt":"Which of the following is not one of the three theories of acquiescence:"},"q6":{"A":"True","B":"False","prompt":"Every licensee now has a different 3-year licensing cycle with a different license expiration date. Licenses no longer all expire on October 31."},"q7":{"A":"Continued and uninterrupted use or enjoyment","B":"Identity of the thing enjoyed","C":"A claim of right adverse to the owner of the soil known to and acquiesced in by him","D":"All of the above","prompt":"To establish an easement by prescription there must be:"},"q8":{"A":"True","B":"False","prompt":"If an apartment complex has a firm policy of not assigning parking spaces to tenants, then the complex would not be required to provide an assigned parking space to a disabled tenant who asks for an assigned space as a reasonable accommodation"},"q9":{"A":"True","B":"False","prompt":"Co-investment plans or opportunities allow you to tap into your home\u2019s equity without borrowing against it."}}');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
let answers = [];
window.onload = function () {
    window.scroll({top: 0});
    document.getElementById("form-submit").addEventListener("click", function (){
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
    )
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

