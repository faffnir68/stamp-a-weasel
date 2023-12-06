import liff from "@line/liff";

function Login() {
    liff.login()
    if(liff.isLoggedIn()) {
        alert('Your are logged in')
    }
}

export default Login