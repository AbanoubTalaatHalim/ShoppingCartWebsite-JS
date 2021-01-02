var mail = document.getElementById('email');
var Name = document.getElementById('name');
var msg = document.getElementById('message');
 

function store(){
//LocalStorage
var contacts = JSON.parse(localStorage.getItem('Contacts')) || [];
var contactData = [
    {Email:   document.getElementById('email').value},
    {Name:    Name.value},
    {Message: msg.value}
    
];

contacts.push(contactData);
localStorage.setItem('Contacts', JSON.stringify(contacts));
}
