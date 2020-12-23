Parse.initialize("ppUUKGXynkwsUpbZRR6bij1SYvqea45AMYUj70xJ", "GNLPxJd50SFbyePttb0k6L1ZnoiRpWRrsoF4ZZlU"); 
Parse.serverURL = "https://parseapi.back4app.com/";

    var loginUsernameText;
    var passwordText;
    var savedLoginUsernameText;
    var savedPasswordText;
    var firstnameText;
    var lastnameText;
    var usernameText;
    var emailText;
    var passwordText;
    var patientId;
    var query;
    

function login() {

    loginUsernameText = document.getElementById("username").value.toString();
    passwordText = document.getElementById("password").value.toString();

    localStorage.setItem("savedUsername", loginUsernameText);
    localStorage.setItem("savedPassword", passwordText);
    localStorage.setItem("savedPatientId",patientId);

    //alert((loginUsernameText));
    //alert((passwordText));


    // Create a new instance of the user class
    var user = Parse.User
    .logIn(loginUsernameText, passwordText).then(function(user) {
    window.location.href = 'taskPage.html';
    patientId = user.get("patientId");
        console.log(patientId);
        
    //alert('Login: ' + user.get("username") + ' and email: ' + user.get("email"));

    }).catch(function(error){
    console.log("Error: " + error.code + " " + error.message);
    });
}
/*
function signUp(){
    firstnameText = document.getElementById("first_name").value.toString();
    lastnameText = document.getElementById("last_name").value.toString();
    usernameText = document.getElementById("username").value.toString();
    emailText =  document.getElementById("email").value.toString();
    passwordText = document.getElementById("password").value.toString();

    var user = new Parse.User();
        user.save({
            first_name: firstnameText,
            last_name: lastnameText,
            username: usernameText,
            email: emailText,
            password: passwordText
        }).then(function(response) {
            //alert('New object create with success! ObjectId: ' + response.id + ', '+ user.get('username'));
            window.location.href = 'login.html';
        }).catch(function(error) {
            alert('Error: ' + error.message);
        });
       
        return false;
}
*/  

window.onload = showTableOnLoad();

function refresh() {
    location.reload(true);
}

function addAndRefresh() {
    addTask();
    //setTimeout(function(){refresh();}, 1000);
}

function deleteAndRefresh() {
    deleteTask();
    setTimeout(function(){refresh();}, 1000);
}


async function addTaskToTheDatabase(objectId){
    let Patient = Parse.Object.extend("Patient");
    let query = new Parse.Query(Patient);
    let patient = await query.get(objectId);
    //alert(patient.get("arrayToDos"));
    var addTaskText = document.getElementById("add_task").value.toString();
    patient.add('arrayToDos', addTaskText);
    patient.save();

    // query.equalTo("objectId", objectId);

    // query.first().then(function(patientHere){
    //     if(patientHere){
    //        console.log('Pet found successful with name: ' + pet.get("arrayToDos"));
    //        alert(pet.get("arrayToDos"))
    //     } else {
    //        console.log("Nothing found, please try again");
    //     }
    // }).catch(function(error){
    //     console.log("Error: " + error.code + " " + error.message);       
    // });
    // alert(patient.get("uniqueId"))
}



async function addTask(){

    var addTaskText = document.getElementById("add_task").value.toString();

    savedLoginUsernameText = localStorage.getItem("savedUsername");
    savedPasswordText = localStorage.getItem("savedPassword");
    patientId = localStorage.getItem("savedPatientId");

    
    
       var user = Parse.User
    .logIn(savedLoginUsernameText, savedPasswordText).then(function(user) {
        console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
       var id = user.get("patientId")
        addTaskToTheDatabase(id);

    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });
}


async function addTaskToTheDatabase(objectId){
    let Patient = Parse.Object.extend("Patient");
    let query = new Parse.Query(Patient);
    let patient = await query.get(objectId)
    
    
    var addTaskText = document.getElementById("add_task").value.toString();
    alert("Succesfully added a task")
    patient.add('arrayToDos', addTaskText);
    patient.save();


}

async function deleteTaskToTheDatabase(objectId){
    let Patient = Parse.Object.extend("Patient");
    let query = new Parse.Query(Patient);
    let patient = await query.get(objectId)
    var addTaskText = document.getElementById("add_task").value.toString();
    
    patient.remove('arrayToDos', addTaskText);
    patient.save();
}


async function deleteTask(){
    var addTaskText = document.getElementById("add_task").value.toString();

    savedLoginUsernameText = localStorage.getItem("savedUsername");
    savedPasswordText = localStorage.getItem("savedPassword");
    
    var user = Parse.User
    .logIn(savedLoginUsernameText, savedPasswordText).then(function(user) {
    console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
        var id = user.get("patientId")
        deleteTaskToTheDatabase(id);
    
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });
}


async function editTask(){
    var addTaskText = document.getElementById("add_task").value.toString();

    savedLoginUsernameText = localStorage.getItem("savedUsername");
    savedPasswordText = localStorage.getItem("savedPassword");
    
    var user = Parse.User
    .logIn(savedLoginUsernameText, savedPasswordText).then(function(user) {
    console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
    
    var id = user.get("patientId")
        deleteTaskToTheDatabase(id);
    user.remove('arrayToDos', addTaskText);
    
    user.save();
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });
}

async function returnArrayToDos(objectId){
    let Patient = Parse.Object.extend("Patient");
    let query = new Parse.Query(Patient);
    let patient = await query.get(objectId)
    //alert(patient.get("arrayToDos"))
    var arr = patient.get("arrayToDos"),
        table = document.getElementsByTagName('table')[0],
        tr = null,
        td = null,
        txt = '';

    for (var i = 0; i < arr.length; i++) {

        var newButton  = document.createElement("BUTTON");
        newButton.id = i;

        newButton.innerHTML = "Edit";
        newButton.addEventListener("click", function(e) {
            e.preventDefault();
            add_task.value = arr[this.id];
            editTask();
        });
        
        txt = document.createTextNode(" " + arr[i]);
        td = document.createElement('td');
        tr = document.createElement('tr');
        td.appendChild(newButton);
        td.appendChild(txt);
        tr.appendChild(td);
        table.appendChild(tr);
    }
   
}

async function showTableOnLoad() {

    savedLoginUsernameText = localStorage.getItem("savedUsername");
    savedPasswordText = localStorage.getItem("savedPassword");

    var user = Parse.User
        .logIn(savedLoginUsernameText, savedPasswordText).then(function(user) {
        console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
   returnArrayToDos(user.get("patientId"));


    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });
}