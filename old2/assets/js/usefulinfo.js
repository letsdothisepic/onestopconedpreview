window.onload = function() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let json = JSON.parse(this.responseText)
            console.log(JSON.stringify(json))
            let i = 0;
            let htmlBuffer = [];
            for(let prop in json){
                console.log(JSON.stringify(prop["timestamp"]))
                htmlBuffer.push("<div class=\"blogPost\">\n" +
                    "                            <h2 align=\"left\">" + json[prop]["title"] + "</h2>\n" +
                    "                            <h6 align=\"left\">" + timeConverter(json[prop]["timestamp"]) + "</h6>\n" +
                    "                            <div class=\"contentWrapper\">\n" +
                    "                                <div class=\"blogContent\">\n" +
                    he.decode(json[prop]["body"]) + //this is slightly unsafe, but as long as we know that we are the ones posting this, we should be okay
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>")
            }
            document.getElementById("posts").innerHTML = htmlBuffer.join("\n");
        }
        else if (this.readyState === 4){
            document.getElementById("posts").innerHTML = "<h1>Something went wrong</h1><h3>Something went wrong when attempting to load the blog.</h3>";
        }
        }
        xhttp.open("GET", "http://localhost:7000/get-blog-posts")
        xhttp.send()
}

function timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    return month + " " + date + ", " + year;
}