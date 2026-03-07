document.getElementById("login-button").addEventListener("click", ()=>{
    const username = document.getElementById("Username").value;
    const password = document.getElementById("password").value;
    
    if(username !== "admin"){
        alert("wrong username");
        return ;
    }else if(password !== "admin123"){
        alert("wrong password");
        return;
    }else{
        alert("login successful");
        window.location.assign("home.html");
    }
})