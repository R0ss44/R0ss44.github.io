//Ryan Tapp: 100800513
//Markus Bruusgaard: 100814163
//Date: 01/27/23



"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
(function(){

    //class for contact object for the contact us page form
    class Contact{
        // Constructor
        constructor( fullName = "", contactNumber = "", emailAddress = "" ){
            this.fullName = fullName;
            this.contactNumber = contactNumber;
            this.emailAddress = emailAddress;
        }
        // Getters
        get FullName(){
            return this.fullName;
        }
        get ContactNumber(){
            return this.contactNumber
        }
        get EmailAddress(){
            return this.emailAddress;
        }
        // Setters
        set FullName(fullName){
            this.fullName = fullName;
        }
        set ContactNumber(contactNumber){
            this.contactNumber = contactNumber;
        }
        set EmailAddress(emailAddress){
            this.emailAddress = emailAddress;
        }
        toString(){
            return `Full Name: ${this.FullName}\nContact Number: ${this.ContactNumber}\nEmail Address ${this.EmailAddress}`;
        }
        //checks if any properties are empty
        serialize(){
            if(this.FullName != "" && this.ContactNumber != "" && this.EmailAddress != ""){
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid");
            return null;
        }
    }

    //finds and stores the main tag
    let MainContent = document.getElementsByTagName("main")[0];


    //Finds the ul tag in the navbar, then adds the new list element adding a link for human resources
    let UnorderedList = document.getElementsByTagName("ul")[0];
    let HumanResources = document.createElement("li");
    HumanResources.innerHTML = `<a class="nav-link" href="resources.html"><i class="fa-solid fa-bell-concierge"></i>Human Resources</a>`;
    HumanResources.setAttribute("class", "nav-item");
    UnorderedList.appendChild(HumanResources);
    //puts human resources link before the contact us link
    UnorderedList.insertBefore(HumanResources, UnorderedList.children[4])


    //create Navbar for the bottom of the page
    let NavBar = document.createElement("nav");
    NavBar.setAttribute("class","navbar fixed-bottom navbar-expand-lg bg-body-tertiary navbar-dark bg-dark");
    let NavBarDiv = document.createElement("div");
    NavBarDiv.setAttribute("class", "container-fluid");
    //Link on Navbar to Home page
    let HomeLink = document.createElement("li")
    HomeLink.setAttribute("class", "nav-item")
    HomeLink = `<a class="nav-link" aria-current="page" href="index.html"><i class="fa-solid fa-house"></i>Home</a>`;
    //Link on Navbar to Projects page
    let ProjectsLink = document.createElement("li")
    ProjectsLink.setAttribute("class", "nav-item")
    ProjectsLink = `<a class="nav-link" href="projects.html"><i class="fa-solid fa-star"></i>Projects</a>`;
    //Link on Navbar to Services page
    let ServicesLink = document.createElement("li")
    ServicesLink.setAttribute("class", "nav-item")
    ServicesLink = `<a class="nav-link" href="services.html"><i class="fa-solid fa-bell"></i>Services</a>`;
    //Link on Navbar to About Us page
    let AboutLink = document.createElement("li")
    AboutLink.setAttribute("class", "nav-item")
    AboutLink = `<a class="nav-link" href="about.html"><i class="fa-solid fa-info-circle"></i>About Us</a>`;
    //Link on Navbar to Human Resources page
    let HumanResourcesLink = document.createElement("li");
    HumanResourcesLink.setAttribute("class", "nav-item");
    HumanResourcesLink= `<a class="nav-link" href="resources.html"><i class="fa-solid fa-bell-concierge"></i>Human Resources</a>`;
    //Link on Navbar to Contact Us page
    let ContactLink = document.createElement("li")
    ContactLink.setAttribute("class", "nav-item")
    ContactLink = `<a class="nav-link" href="contact.html"><i class="fa-solid fa-phone"></i>Contact Us</a>`;

    //add the other navbar elements and the navbar links, then append child
    NavBarDiv = `<a class="navbar-brand">
        Copyright <i class="fa-regular fa-copyright"> 2023</i></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">` + HomeLink
            + ProjectsLink + ServicesLink + AboutLink + HumanResourcesLink
            + ContactLink +`</ul></div>`;
    NavBar.innerHTML = NavBarDiv;
    MainContent.appendChild(NavBar);

    //displays a welcoming paragraph on the home page
    function DisplayHomePage(){

        //creates a paragraph tag for content in index.html
        let MainParagraph = document.createElement("p");
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is the homepage for our website, it was created as a requirement for " +
            "assignment 1 or WEBD6201 Client-Side Programming. It's used to demonstrate our understanding " +
            "of DOM manipulation.";

        MainContent.appendChild(MainParagraph);

    }
    //displays our favourite projects on the projects page
    function DisplayProjectsPage(){
        //creates a paragraph element to explain our group projects
        let ProjectPageDescription = document.createElement("p");
        MainContent.appendChild(ProjectPageDescription);
        ProjectPageDescription.textContent = "Ryan and Markus worked on any group assignments together" +
            " so we have many projects created by the both of us. All three of the projects listed here we " +
            " completed together."
        //image and description for project 1
        let Project1Header = document.createElement("h3");
        Project1Header.textContent = "Project 1";
        let Project1Text = document.createElement("p");
        Project1Text.textContent = "This project was created using Java, it creates 2 classes, Products and Perishable " +
            "Products. It then uses constructors for each class to create objects of both types and display them in" +
            " the console."
        let Project1Image = document.createElement("img");
        Project1Image.setAttribute("src", "./images/project1.png");

        MainContent.appendChild(Project1Header);
        MainContent.appendChild(Project1Text);
        MainContent.appendChild(Project1Image);

        //image and description for project 2
        let Project2Header = document.createElement("h3");
        Project2Header.textContent = "Project 2";
        let Project2Text = document.createElement("p");
        Project2Text.textContent = "This project was created using Java, it creates a console application that allows " +
            "a user to input details for a car into a list of other cars. The user can then remove the car, list the cars" +
            " add another car, search for a car, or close the program. "
        let Project2Image = document.createElement("img");
        Project2Image.setAttribute("src", "./images/project2.png");

        MainContent.appendChild(Project2Header);
        MainContent.appendChild(Project2Text);
        MainContent.appendChild(Project2Image);

        //image and description for project 3
        let Project3Header = document.createElement("h3");
        Project3Header.textContent = "Project 3";
        let Project3Text = document.createElement("p");
        Project3Text.textContent = "In this project, you may input a type of vaccine and it will save it to a database" +
            " and display the information of the vaccine in the console."
        let Project3Image = document.createElement("img");
        Project3Image.setAttribute("src", "./images/project3.png");

        MainContent.appendChild(Project3Header);
        MainContent.appendChild(Project3Text);
        MainContent.appendChild(Project3Image);

    }
    //displays what services we offer on the services page
    function DisplayServicesPage(){
        //creates a paragraph tag and image tag for content in services.html
        let MainParagraph = document.createElement("p");
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.innerHTML = `Here at [Company for WEBD6201 Assignment 1] we provide services such as: </br>
            - Custom programming </br>- Web design</br>- Mobile development</br>- & More!</br>
            If you would Like our services, we here at [Company for WEBD6201 Assignment 1] are always happy to help!</br>`;
        let MainImage = document.createElement("img");
        MainImage.setAttribute("src", "./images/codebrain.png");

        MainContent.appendChild(MainParagraph);
        MainContent.appendChild(MainImage);

    }
    //displays information about us on the about us page
    function DisplayAboutUsPage(){
        //creates a table to display images and information about us
        let MainTable = document.createElement("table");
        MainTable.setAttribute("id", "mainTable")

        let MainTableContent = `<tr>
            <td align="center" style=font-size:25px;  padding: 0 15px;>
            Ryan Tapp
            </td>
            <td align="center" style=font-size:25px>
            Markus Bruusgaard
            </td>
            </tr>
            <tr>
            <td id="ryanCell" align="center">
                <img src="./images/ryan.png">
            </td>
            <td id="markusCell" align="center">
                <img src="./images/markus.png"
            </td>
            </tr>
            <tr>
            <td>
                Ryan is a student at Durham College in his 4th semester
            </br>  of Computer Programming. He enjoys coding and does
            </br> some simple modding for the game Terraria in his free
            </br> time. Ryan is planning on taking an Artificial Intelligence
            </br> program after he graduates from his current program. 
            </td>
            <td>
            Markus is a student at Durham College is his 4th semester
            </br> of Computer Programming. In his free time Markus practices
            </br>his banjo/guitar skills, or plays Splatoon 3 on his Nintendo
            </br>switch. After graduation, Markus plans to travel to London, 
            </br>England, and from there through all of Europe!
            </td>
            </tr>`;

        MainTable.innerHTML = MainTableContent;
        MainContent.appendChild(MainTable);
    }
    //adds functionality and validation to the button on the contact us page
    function DisplayContactPage() {

        sendButton.addEventListener("click", function(event)
        {
            event.preventDefault();
            let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
            if (contact.serialize()){
                console.log(contact.toString());
                setTimeout(function(){window.location = "./index.html"}, 3000);
            } else{
                window.alert("Please fill out required(*) fields.");
            }

        })
    }

    //runs a display function based on what html page is open
    function Start()
    {
        console.log("App Started.")
        switch (document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Projects":
                DisplayProjectsPage();
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
        }
    }

    window.addEventListener("load", Start)


})();