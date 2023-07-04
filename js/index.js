document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/books").then((response) => response.json()).
    then(function(response){
        //console.log("response = " + response);
        //author, description, id, img_url, subtitle, title, array of users
        //users array of objects has: id, username

        //need to put it in a list of books that we have access to
        //when I click one I need to pass it into the event listener
        let mybooksarr = response;
        let mydispid = -1;
        for (let n = 0; n < mybooksarr.length; n++)
        {
            //add it to DOM here then add the element on click listeners
            //console.log("mybooksarr[" + n + "] = " + mybooksarr[n]);
            //console.log("mybooksarr[" + n + "].author = " + mybooksarr[n].author);
            //console.log("mybooksarr[" + n + "].description = " + mybooksarr[n].description);
            //console.log("mybooksarr[" + n + "].id = " + mybooksarr[n].id);
            //console.log("mybooksarr[" + n + "].img_url = " + mybooksarr[n].img_url);
            //console.log("mybooksarr[" + n + "].title = " + mybooksarr[n].title);
            //console.log("mybooksarr[" + n + "].subtitle = " + mybooksarr[n].subtitle);
            //console.log("mybooksarr[" + n + "].users = " + mybooksarr[n].users);
            
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
            myuserslikelist.id = mybooksarr[n].id + "bklikelist";
            mylikebtn.textContent = "Like";
            mylikebtn.disabled = true;
            mydesc.textContent = "" + mybooksarr[n].description;
            mytitle.textContent = "" + mybooksarr[n].title;
            if (mybooksarr[n].subtitle == undefined) mysubtitle.textContent = "";
            else mysubtitle.textContent = "" + mybooksarr[n].subtitle;
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
                //console.log("this.id = " + this.id);
                //console.log("OLD mydispid = " + mydispid);
                if (mydispid < 0 || mydispid > mybooksarr.length);
                else
                {
                    document.getElementById(mydispid + "bkinfo").style.display = "none";
                    document.getElementById(mydispid + "bkinfo").
                        getElementsByTagName("button")[0].disabled = true;
                    //console.log("hid the last displayed book info!");
                }

                document.getElementById(this.id + "bkinfo").style.display = "block";
                document.getElementById(this.id + "bkinfo").
                    getElementsByTagName("button")[0].disabled = false;
                mydispid = this.id;
                //console.log("NEW mydispid = " + mydispid);
                //console.log("successfully displayed the book!");
                //debugger;
            }.bind(myli));
            document.getElementById("list").appendChild(myli);
        }//end of n for loop
        //console.log("successfully added all of the data except the users list!");
        //debugger;
        
        //hook up the users like list
        for (let n = 0; n < mybooksarr.length; n++)
        {
            //console.log("mybooksarr[" + n + "].users = " + mybooksarr[n].users);
            let mybkuserslist = document.getElementById(mybooksarr[n].id + "bklikelist");
            for (let k = 0; k < mybooksarr[n].users.length; k++)
            {
                //console.log("mybooksarr[" + n + "].users[" + k + "].id = " +
                //    mybooksarr[n].users[k].id);
                //console.log("mybooksarr[" + n + "].users[" + k + "].username = " +
                //    mybooksarr[n].users[k].username);
                //users array of objects has: id, username
                let myli = document.createElement("li");
                myli.id = "" + mybooksarr[n].users[k].id + "usrid";
                myli.textContent = "" + mybooksarr[n].users[k].username;
                mybkuserslist.appendChild(myli);
            }//end of k for loop
        }//end of n for loop
        //console.log("successfully added all of the data now including the users list!");
        //debugger;

        //need to set up the like and unlike for my user
        //first need to get an id for my user
        //by posting a username on the server
        //then get the response
        //then pass that information each time I like/unlike a books
        //for the like or unlike, need to get the users array or generate it
        //then add/remove the new one then post it
        //then add/remove the new one to/from the DOM
        let myuserid = -1;
        const myusernm = "ckelly38";
        let myconfigobj = {
            method: "POST",
            headers:
            {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            },
            body: JSON.stringify({"username" : myusernm})
        };
        fetch("http://localhost:3000/users", myconfigobj).
        then((response) => response.json()).
        then(function(response){
            //console.log("response = " + response);
            myuserid = response.id;
            //console.log("myuserid = " + myuserid);
            
            //now set up all of the like buttons here...
            for (let n = 0; n < mybooksarr.length; n++)
            {
                let mylikebtn = document.getElementById(mybooksarr[n].id + "bkinfo").
                    getElementsByTagName("button")[0];
                mylikebtn.addEventListener("click", function(event){
                    //console.log("myusernm = " + myusernm);
                    //console.log("myuserid = " + myuserid);
                    //console.log("this.textContent = " + this.textContent);
                    let likeit = (this.textContent === "Like");
                    //console.log("likeit = " + likeit);
                    
                    let myuserslikeitarr = new Array();
                    if (likeit)
                    {
                        for (let k = 0; k < mybooksarr[n].users.length; k++)
                        {
                            let mynwuser = {
                                id: mybooksarr[n].users[k].id,
                                username: mybooksarr[n].users[k].username
                            };
                            myuserslikeitarr.push(mynwuser);
                        }//end of k for loop
                        let mynwuser = {
                            id: myuserid,
                            username: myusernm
                        };
                        myuserslikeitarr.push(mynwuser);
                    }
                    else
                    {
                        for (let k = 0; k < mybooksarr[n].users.length; k++)
                        {
                            if (mybooksarr[n].users[k].id === myuserid);
                            else
                            {
                                let mynwuser = {
                                    id: mybooksarr[n].users[k].id,
                                    username: mybooksarr[n].users[k].username
                                };
                                myuserslikeitarr.push(mynwuser);
                            }
                        }
                    }
                    let mynwbk = {
                        author: mybooksarr[n].author,
                        description: mybooksarr[n].description,
                        id: mybooksarr[n].id,
                        img_url: mybooksarr[n].img_url,
                        title: mybooksarr[n].title,
                        subtitle: mybooksarr[n].subtitle,
                        users: myuserslikeitarr
                    };
                    

                    let mylikeconfigobj = {
                        method: "PATCH",
                        headers:
                        {
                            "Content-Type" : "application/json",
                            "Accept" : "application/json",
                        },
                        body: JSON.stringify(mynwbk)
                    };
                    fetch("http://localhost:3000/books/" + mybooksarr[n].id, mylikeconfigobj).
                    then((oresponse) => oresponse.json()).then(function(oresponse){
                        //console.log("oresponse = " + oresponse);
                        let myuseridki = -1;
                        //debugger;
                        //console.log("oresponse.users.length = " + oresponse.users.length);
                        for (let k = 0; k < oresponse.users.length; k++)
                        {
                            //console.log("oresponse.users[" + k + "].username = " +
                            //    oresponse.users[k].username);
                            //console.log("oresponse.users[" + k + "].id = " + oresponse.users[k].id);
                            if (oresponse.users[k].id === myuserid)
                            {
                                if (myuseridki < 0 || myuseridki > oresponse.users.length)
                                {
                                    myuseridki = k;
                                    //console.log("FOUND MY USERNAME!");
                                }
                                //else;//do nothing
                            }
                            //else;//do nothing
                        }//end of k for loop
                        //console.log("myuseridki = " + myuseridki);
                        //debugger;
                        
                        //now update the dom
                        let mybkuserslist =
                            document.getElementById(mybooksarr[n].id + "bklikelist");
                        if (likeit)
                        {
                            if (myuseridki < 0 || myuseridki > oresponse.users.length)
                            {
                                throw "my user name was supposed to be on the response, but it " +
                                    "was not!"
                            }
                            //else;//do nothing

                            let mynwli = document.createElement("li");
                            mynwli.id = "" + myuserid + "usr";
                            mynwli.textContent = "" + myusernm;
                            mybkuserslist.appendChild(mynwli);
                        }
                        else
                        {
                            if (myuseridki < 0 || myuseridki > oresponse.users.length);
                            else
                            {
                                throw "my user name was not supposed to be on the response, but " +
                                    "it was!";
                            }
                            mybkuserslist.removeChild(document.getElementById(myuserid + "usr"));
                        }

                        if (likeit) mylikebtn.textContent = "Unlike";
                        else mylikebtn.textContent = "Like";
                        //console.log("mylikebtn = " + mylikebtn);
                        //console.log("NEW mylikebtn.textContent = " + mylikebtn.textContent);
                        //console.log("successfully liked or unliked the book!");
                        //debugger;
                    }).catch(function(oerr){
                        console.error("there was an error updating the like status of the user " +
                            "on the server!");
                        console.error(oerr);
                    });
                    //debugger;
                }.bind(mylikebtn));
            }//end of n for loop
            //console.log("successfully set up the like/unlike buttons!");
            //debugger;
        }).catch(function(err){
            console.error("there was an error adding a new user to the server!");
            console.error(err);
        });
    })
    .catch(function(err){
        console.error("there was a problem getting the list of books for the program!");
        console.error(err);
    });
});
