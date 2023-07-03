document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/books").then((response) => response.json()).
    then(function(response){
        console.log("response = " + response);
        //author, description, id, img_url, subtitle, title, array of users
        //users array of objects has: id, username

        //need to put it in a list of books that we have access to
        //when I click one I need to pass it into the event listener
        let mybooksarr = response;
        let mydispid = -1;
        for (let n = 0; n < mybooksarr.length; n++)
        {
            //add it to DOM here then add the element on click listeners
            console.log("mybooksarr[" + n + "] = " + mybooksarr[n]);
            console.log("mybooksarr[" + n + "].author = " + mybooksarr[n].author);
            console.log("mybooksarr[" + n + "].description = " + mybooksarr[n].description);
            console.log("mybooksarr[" + n + "].id = " + mybooksarr[n].id);
            console.log("mybooksarr[" + n + "].img_url = " + mybooksarr[n].img_url);
            console.log("mybooksarr[" + n + "].title = " + mybooksarr[n].title);
            console.log("mybooksarr[" + n + "].subtitle = " + mybooksarr[n].subtitle);
            console.log("mybooksarr[" + n + "].users = " + mybooksarr[n].users);
            
            //image
            //bold and h2: title, subtitle, author
            //normal p for description
            //list of users that like it
            //then a like button
            let mybkcntr = document.createElement("div");
            mybkcntr.id = mybooksarr[n].id + "bkinfo";
            let myimg = document.createElement("img");
            myimg.src = mybooksarr[n].img_url;
            let mybold = document.createElement("b");
            let mytitle = document.createElement("h2");
            let mysubtitle = document.createElement("h2");
            let myauthor = document.createElement("h2");
            let mydesc = document.createElement("p");
            let myuserslikelist = document.createElement("ul");
            let mylikebtn = document.createElement("button");
            mylikebtn.textContent = "Like";
            mylikebtn.disabled = true;
            mydesc.textContent = "" + mybooksarr[n].description;
            mytitle.textContent = "" + mybooksarr[n].title;
            mysubtitle.textContent = "" + mybooksarr[n].subtitle;
            myauthor.textContent = "" + mybooksarr[n].author;
            mybold.appendChild(mytitle);
            mybold.appendChild(mysubtitle);
            mybold.appendChild(myauthor);
            mybkcntr.appendChild(myimg);
            mybkcntr.appendChild(mybold);
            mybkcntr.appendChild(mydesc);
            mybkcntr.appendChild(myuserslikelist);
            mybkcntr.appendChild(mylikebtn);
            mybkcntr.style.display = "none";
            document.getElementById("show-panel").appendChild(mybkcntr);


            let myli = document.createElement("li");
            myli.textContent = mybooksarr[n].title;
            myli.id = mybooksarr[n].id;
            myli.addEventListener("click", function(event){
                console.log("this.id = " + this.id);
                console.log("OLD mydispid = " + mydispid);
                if (mydispid < 0 || mydispid > mybooksarr.length);
                else
                {
                    document.getElementById(mydispid + "bkinfo").style.display = "none";
                    document.getElementById(mydispid + "bkinfo").
                        getElementsByTagName("button")[0].disabled = true;
                    console.log("hid the last displayed book info!");
                }

                document.getElementById(this.id + "bkinfo").style.display = "block";
                document.getElementById(this.id + "bkinfo").
                    getElementsByTagName("button")[0].disabled = false;
                mydispid = this.id;
                console.log("NEW mydispid = " + mydispid);
                console.log("successfully displayed the book!");
                debugger;
            }.bind(myli));
            document.getElementById("list").appendChild(myli);
        }//end of n for loop
        
        //hook up the users like list
        //for (let n = 0; n < mybooksarr.length; n++)
        //{
            //document.getElementById(mybooksarr[n].id)//
        //}//end of n for loop
        debugger;
    })
    .catch(function(err){
        console.error("there was a problem getting the list of books for the program!");
        console.error(err);
    });
});
