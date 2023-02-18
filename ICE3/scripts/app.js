"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
(function(){

    /**
     * Instantiates a contact and stores in local storage
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     * @constructor
     */
    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    function AjaxRequest(method, url, callback){
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", () => {
            if(xhr.readyState === 4 && xhr.status === 200){
                if(typeof callback === "function"){
                    callback(xhr.responseText);
                }else{
                    console.error("Error: Callback is not a valid function");
                }
            }
        });
        xhr.open(method, url);
        xhr.send();
    }

    function LoadHeader(html_data){
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active");
    }


    function DisplayHomePage() {
        console.log("Home page Called")

        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html"
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the main Paragraph!</p>`);

        //Step 6 - Create Article
        $("body").append(`<article class="container">
            <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);

    }
    function DisplayProductsPage(){
        console.log("Products page Called")
    }
    function DisplayServicesPage(){
        console.log("Services page Called")

    }
    function DisplayAboutUsPage(){
        console.log("About Us page Called")

    }
    /*
    function TestFullName(){
        let fullNamePattern = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/;
        let messageArea = $("#messageArea");

        $("#fullName").on("blur", function(){

            let fullNameText = $(this).val();
            if(!fullNamePattern.test(fullNameText)){
                //fail
                $(this).trigger("focus"); //return back to fullName text box
                $(this).trigger("select"); //highlight text
                messageArea.addClass("alert alert-danger")
                messageArea.text("Please enter a valid Full Name")
                messageArea.show();
            }else{
                //pass
                messageArea.removeAttr("class")
                messageArea.hide();
            }
        });
    }
    */

    /**
     * this function will validate an input field provided based on a given regular expression
     * @param {string} input_field_id
     * @param {RegExp} regular_expression
     * @param {string} error_message
     * @constructor
     */
    function ValidateField(input_field_id, regular_expression, error_message){
        let messageArea = $("#messageArea");

        $(input_field_id).on("blur", function(){

            let fullNameText = $(this).val();
            if(!regular_expression.test(fullNameText)){
                //fail
                $(this).trigger("focus").trigger("select"); //highlight text
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                //pass
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation(){
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "please enter a valid FullName (ex: Homer Simpson)"); //full name
        ValidateField("#fullName",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "please enter a valid phone number (ex: 416-555-5555)"); //contact
        ValidateField("#fullName",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "please enter a valid email address (ex: email@domain.com"); //email
    }

    function DisplayContactPage(){
        console.log("Contact page Called")

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox")

        sendButton.addEventListener("click", function (){

            if(subscribeCheckbox.checked){
                let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize()){
                    let key = contact.FullName.substring(0,1) + Date.now();
                    localStorage.setItem(key, contact.serialize())
                }
            }
        })
    }
    function DisplayContactListPage(){
        console.log("Contact List page Called")

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         
                         <td class="text-center"> <button class="btn btn-primary btn-sm edit" value="${key}">
                         <i class="fas fa-edit fa-sm"></i> Edit</button>
                         </td>
                         
                         <td class="text-center"> <button class="btn btn-danger btn-sm delete" value="${key}">
                         <i class="fas fa-trash-alt fa-sm"></i> Delete</button>
                         </td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;

            $("#addButton").on("click", () => {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function(){
                if(confirm("Delete contact - Are you sure?")){
                    localStorage.removeItem($(this).val());
                }
                location.html = "contact-list.html"
            });

            $("button.edit").on("click", function(){
                location.href = "edit.html#" + $(this).val();
            });

        }

    }
   function DisplayEditPage() {
       console.log("Edit Page")

       ContactFormValidation();

       let page = location.hash.substring(1);

        switch(page){
            case "add":

                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle"></i> Add`)

                $("#editButton").on("click", (event) =>{
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value)
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () =>{
                    location.href = "contact-list.html";
                })

                break;
            default:{  //edit case

                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val((contact.EmailAddress));

                $("#editButton").on("click", (event) => {
                    event.preventDefault();

                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());

                    location.href = "contact-list.html"
                });

                $("#cancelButton").on("click", () =>{
                    location.href = "contact-list.html";
                })

            }
            break;
        }
   }

    function DisplayLoginPage(){
        console.log("Login Page");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function (){
            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function(data){
                for(const u of data.user){
                    if(username.value === u.Username && password.value === u.Password){
                        success = true;
                        newUser.fromJSON(user);
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "index.html";

                }else{
                    //failed authentication
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger")
                        .text("Error: Invalid Credentials");
                }

            });

            $("#cancelButton").on("click", function(){

                document.forms[0].reset();
                location.href = "index.html";
            })

        });
    }

    function CheckLogin(){

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                                                    <i class="fas fa-sign-out-alt"></i>Logout</a>`);
        }

        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "login.html"
        });
    }
    function DisplayRegisterPage(){
        console.log("Register Page");
    }





    function Start()
    {
        console.log("App Started.")

        AjaxRequest("GET", "header.html", LoadHeader);

        switch (document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
        }
    }

    window.addEventListener("load", Start)

})();