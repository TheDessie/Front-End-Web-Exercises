
const callback = (success, code, msg) => {
    if (!success) {
        document.getElementById("errors").innerHTML = msg;
    }
    else {
        if (document.getElementById("register-form")) {
            alert("Successful registration!");
        }
        window.location.href = "./posts.html";
    }
}

const validate = (event) => {
    event.preventDefault();

    let msg = [];
    let data = validateUsername();
    if (data) msg.push(data);

    data = validateEmail();
    if (data) msg.push(data);

    data = validatePassword();
    if (data) msg.push(data);

    msg = msg.join("<br>");

    if (msg) {
        document.getElementById("errors").innerHTML = msg;
        return false;
    }
    if (document.getElementById("register-form")) {

        window.auth.register(document.getElementsByName("username")[0].value,
            document.getElementsByName("email")[0].value,
            document.getElementsByName("password")[0].value,
            callback);
    }
    else {
        window.auth.login(document.getElementsByName("email")[0].value,
            document.getElementsByName("password")[0].value,
            callback);
    }
}


const form = document.forms[0];
form.addEventListener('submit', validate);


const validateUsername = () => {
    if (document.getElementsByName("username").length === 0) {
        return "";
    }
    let msg = "";
    let value = document.getElementsByName("username")[0].value;
    if (!value) {
        msg = "Username is required!"
    }
    return msg;
}

const validateEmail = () => {
    let msg = "";
    let value = document.getElementsByName("email")[0].value;
    if (!value) {
        msg = "Email is required!"
    }
    else if (!/@/.test(value) ||
        !/\./.test(value.substr(value.indexOf("@")))||
        value.length < 5) {
        msg = "Invalid email format!"
    }
    return msg;
}

const validatePassword = () => {
    let msg = "";
    let value = document.getElementsByName("password")[0].value;
    if (!value) {
        msg = "Password is required!"
    }
    else if (value.length < 6) {
        msg = "Password must contain at least 6 characters!"
    }
    else if (!/[A-Z]/.test(value)) {
        msg = "Password must contain at least one uppercase letter!"
    }
    else if (!/\d/.test(value)) {
        msg = "Password must contain at least one digit!"
    }
    else if (!/[!@#$%^&]/.test(value)) {
        msg = "Password must contain a special symbol - !@#$%^&"
    }
    return msg;
}