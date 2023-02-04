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
    function DisplayContactPage(){
        console.log("Contact page Called")
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



    function Start()
    {
        console.log("App Started.")
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
        }
    }

    window.addEventListener("load", Start)

})();