let signInForm = document.getElementById("signInForm");
let email = document.getElementById("signEmail");
let emailerrmsg = document.getElementById("emailerr");
let passerrmsg = document.getElementById("passerr");
let password = document.getElementById("signpass");
let formbtn = document.getElementById("formBtn");


email.addEventListener("blur",function(){
    if(email.value ===""){
        emailerrmsg.textContent = "*Required";
        emailerrmsg.style.color = "red";
    }
})
password.addEventListener("blur",function(){
    if(event.target.value === ""){
        passerrmsg.textContent = "*Required";
        passerrmsg.style.color = "red";
    }

})
signInForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (email.value === "") {
        emailerrmsg.textContent = "*Required";
        passerrmsg.textContent = "";
        emailerrmsg.style.color = "red";
    } else if (password.value === "") {
        passerrmsg.textContent = "*Required";
        emailerrmsg.textContent = "";
        passerrmsg.style.color = "red";
    } else if (email.value !== "" && password.value !== "") {
        emailerrmsg.textContent = "";
        passerrmsg.textContent = "";
        // alert("login successful");
        window.location.href="index.html";
    } else {
        emailerrmsg.textContent = "*Required";
        passerrmsg.textContent = "*Required";
    }
});

document.querySelectorAll('.viewmenu').forEach(function(element) {
    element.onclick = function(e) {
        e.preventDefault(); // Prevent default link behavior
        // Scroll to the menu section
        document.getElementById('exploreMenuSection').scrollIntoView({ behavior: 'smooth' });
    };
});

let fdmsg=document.getElementById("feedbackcontainer");

let fdbtn=document.getElementById("fdbtn");
fdbtn.addEventListener("click",function(){
    
    let msg=document.getElementById("Feedback");
    let val=msg.value.trim();
    let realfeedback = document.getElementById("realfeedback");
    if(val===""){
        realfeedback.textContent="Please enter your feedback!";
        realfeedback.style.color="red";    
    }else{
        realfeedback.textContent="Thank you for your feedback!";
        realfeedback.style.color="green";
        msg.value = "";
    }
})