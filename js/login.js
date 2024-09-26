let username = document.querySelector("#username")
let password = document.querySelector("#password")
let email =document.querySelector("#email")
let loginBtn = document.querySelector("#sign_in")

let getUser = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

loginBtn.addEventListener ("click" , function(e){
    e.preventDefault()
    if (email.value==="" || password.value===""){
        alert("please fill data ")
    } else {
        if ( (getUser && getUser.trim() === email.value.trim() && getPassword && getPassword === password.value )  )
        {
            setTimeout ( () => {
                window.location = "index.html"
            } , 1500)
        } else {
            console.log("email or password is wrong ")
        }
    }
})



