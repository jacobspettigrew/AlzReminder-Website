Parse.initialize("Um5azHXQfLSlYJVJqg2pL6SkQcJVXcLPyTNt1V4P", "6b1GVky3F5euaOWpggwgqigBlJ3NHNxswYeFaRyy"); 
Parse.serverURL = "https://parseapi.back4app.com/";

    var usernameText;
    var passwordText;
    var firstnameText;
    var lastnameText;
    var usernameText;
    var emailText;
    var passwordText;

function login() {
    usernameText = document.getElementById("username").value.toString();
    passwordText = document.getElementById("password").value.toString();

    // Create a new instance of the user class
    var user = Parse.User
    .logIn(usernameText, passwordText).then(function(user) {
    window.location.href = 'taskPage.html';
    alert('Login: ' + user.get("username") + ' and email: ' + user.get("email"));
    }).catch(function(error){
    console.log("Error: " + error.code + " " + error.message);
    });
}

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
        }).then(function(response) {window.location.href = 'login.html';
            alert('New object create with success! ObjectId: ' + response.id + ', '+ user.get('username'));
        }).catch(function(error) {
            alert('Error: ' + error.message);
        });
       
        return false;
}
      

window.onload = showTableOnLoad();

function refresh() {
    location.reload(true);
}

function addAndRefresh() {
    addTask();
    setTimeout(function(){refresh();}, 1000);
}

function deleteAndRefresh() {
    deleteTask();
    setTimeout(function(){refresh();}, 1000);
}


async function addTask(){

    var addTaskText = document.getElementById("add_task").value.toString();
            
    var user = Parse.User
        .logIn("123", "123").then(function(user) {
                console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
                user.addUnique('Tasks', addTaskText);
                user.save();

                
        }).catch(function(error){
                console.log("Error: " + error.code + " " + error.message);
            });      
}


async function deleteTask(){
    var addTaskText = document.getElementById("add_task").value.toString();
            
    var user = Parse.User
        .logIn(usernameText, passwordText).then(function(user) {
            console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
            user.remove('Tasks', addTaskText);
            
            user.save();
    }).catch(function(error){
                console.log("Error: " + error.code + " " + error.message);
            });
}

async function editTask(){
    var addTaskText = document.getElementById("add_task").value.toString();
            
    var user = Parse.User
        .logIn("123", "123").then(function(user) {
            console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
            
            user.remove('Tasks', addTaskText);
            
            user.save();
            }).catch(function(error){
               console.log("Error: " + error.code + " " + error.message);
            });
}

function showTableOnLoad() {
    var user = Parse.User
        .logIn(usernameText, passwordText).then(function(user) {
            console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));

    var arr = user.get('Tasks'),
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

        }).catch(function(error){
            console.log("Error: " + error.code + " " + error.message);
        });
}