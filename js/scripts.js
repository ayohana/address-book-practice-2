//Business logic for AddressBook
function AddressBook()
{
    this.contacts = [];
    this.currentId = 0;
}

AddressBook.prototype.AddContact = function(contact) {
    contact.id = this.assignId();
    this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
  }
  
  AddressBook.prototype.findContact = function(id) {
    for (var i=0; i< this.contacts.length; i++) {
      if (this.contacts[i]) {
        if (this.contacts[i].id == id) {
          return this.contacts[i];
        }
      }
    };
    return false;
  }
  
  AddressBook.prototype.deleteContact = function(id) {
    for (var i=0; i< this.contacts.length; i++) {
      if (this.contacts[i]) {
        if (this.contacts[i].id == id) {
          delete this.contacts[i];
          return true;
        }
      }
    };
    return false;  
  }
  
  // Business Logic for Contacts ---------
  function Contact(firstName, lastName, phoneNumber, email, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = [];
  }
  
  Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
  }

  Contact.prototype.addAddress = function(newAddress) {
    return this.address.push(newAddress);
  }

  // var contact1 = new Contact("Ada", "Lovelace", 123, "aaa@aaa");
  // var newAdd = "123 St"
  // var newadd2 = "125 ave"
  // console.log(contact1)
  // contact1.addAddress(newAdd)
  // console.log(contact1)
  // contact1.addAddress(newadd2)
  // console.log(contact1.address[0])




//Interface logic
function displayContactDetails(addressBookToDisplay) {
    var contactsList = $("#contacts-list");
    var htmlForContactInfo = "";
    addressBookToDisplay.contacts.forEach(function(contact) {
        htmlForContactInfo += `<li id='${contact.id}'>${contact.fullName()}</li>`;
    });
    contactsList.html(htmlForContactInfo);
}


function showContact(contact) {
    var showContactElement = $("#show-contact");
    var htmlForContactDetails = "";
    htmlForContactDetails += `<h2>${contact.fullName()}</h2>`;
    htmlForContactDetails += `<p>${contact.phoneNumber}</p>`;
    htmlForContactDetails +=  `<p>${contact.email}</p>`;
    console.log(contact.address)
    htmlForContactDetails += `<p>${contact.address[0]}</p>`;
    htmlForContactDetails += `<p>${contact.address[1]}</p>`
    htmlForContactDetails += `<button id=${contact.id} class="delete-button">Delete Contact</button>`;
    showContactElement.html(htmlForContactDetails);
    showContactElement.toggle();
}

function resetFormInputs(formInputs) {
    formInputs.forEach(function(formInput) {
        formInput.val("");
    })
}
function attachContactListeners(){
    $("ul#contacts-list").on("click","li", function(){
        var contact = addressBook.findContact(this.id);
        showContact(contact);
    });

    $("#show-contact").on("click", ".delete-button", function() {
        addressBook.deleteContact(this.id);
        $("#show-contact").toggle();
        displayContactDetails(addressBook);
    })
};

var addressBook = new AddressBook();

$(document).ready(function() {
    attachContactListeners();
    $("form#create-contact-form").submit(function(event) {
        event.preventDefault();
        var firstNameInput = $("input#new-first-name");
        var lastNameInput= $("input#new-last-name");
        var phoneNumberInput = $("input#new-phone-number");
        var emailInput = $("input#new-email");
        var addressInput = $("input#new-address");
        var workInput = $("input#new-work");
        var inputArray = [firstNameInput, lastNameInput, phoneNumberInput, emailInput, addressInput, workInput];

        var newContact = new Contact (firstNameInput.val(), lastNameInput.val(),phoneNumberInput.val(), emailInput.val());
        newContact.addAddress(addressInput.val());
        newContact.addAddress(workInput.val());
        addressBook.AddContact(newContact);
        displayContactDetails(addressBook);
        resetFormInputs(inputArray);
    })
})