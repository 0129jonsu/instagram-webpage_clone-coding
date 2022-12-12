function idpw_input(){
    var user_id = document.getElementById('user_id').value;
    var user_pw = document.getElementById('user_pw').value;
    login_bg(user_id, user_pw);
}

function login_bg(ui,up) {
    if(ui.length >= 1 && up.length >=6){
        document.getElementById("login-button").style.backgroundColor = "rgb(81, 190, 255)";
        document.getElementById("login-button").style.cursor="Pointer";
    }
    else{
        document.getElementById("login-button").style.backgroundColor = "rgb(178 223 252)";
        document.getElementById("login-button").style.cursor="default";
    }
} 

function sign_up_input(){
    var sign_up_mobile_email = document.getElementById('sign_up_mobile_email').value;
    var sign_up_full_name = document.getElementById('sign_up_full_name').value;
    var sign_up_user_name = document.getElementById('sign_up_user_name').value;
    var sign_up_pw = document.getElementById('sign_up_pw').value;
    sign_up_check(sign_up_mobile_email, sign_up_full_name,sign_up_user_name,sign_up_pw);
}

function sign_up_check(me,fn,un,pw) {
    if(me.length >= 1 && fn.length >= 1 && un.length >= 1 && pw.length >=6){
        document.getElementById("sign-up-button").style.backgroundColor = "rgb(81, 190, 255)";
        document.getElementById("sign-up-button").style.cursor="Pointer";
    }
    else{
        document.getElementById("sign-up-button").style.backgroundColor = "rgb(178 223 252)";
        document.getElementById("sign-up-button").style.cursor="default";
    }
} 
