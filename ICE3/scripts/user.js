"use strict";

(function(core) {

    class User{

        constructor( displayName = "", emailAddress = "", username = "", password = "",) {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }



        //getters and setters
        get getDisplayName(){
            return this.m_displayName;
        }
        get getEmailAddress(){
            return this.m_emailAddress;
        }
        get getUsername(){
            return this.m_username;
        }
        get getPassword(){
            return this.m_password;
        }

        set setDisplayName(displayName){
            this.m_displayName = displayName;
        }
        set setEmailAddress(emailAddress){
            this.m_emailAddress = emailAddress;
        }
        set setUsername(username){
            this.m_username = username;
        }
        set setPassword(password){
            this.m_password = password;
        }

        toString(){
            return `Display Name: ${this.DisplayName}\n Email Address ${this.EmailAddress}\n Username: ${this.Username}`;
        }

        toJSON(){
            return {
                "DisplayName" : this.DisplayName,
                "EmailAddress" : this.EmailAddress,
                "Username" : this.Username,
                "Password" : this.Password,
            }
        }

        fromJSON(data){
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        serialize(){
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "" && this.Password !== ""){
                return `${this.DisplayName}, ${this.EmailAddress}, ${this.Username}, ${this.Password}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid");
            return null;
        }
        deserialize(data){
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
            this.Password = propertyArray[3];
        }

    }

    core.Contact = Contact;
})(core || (core = {}));