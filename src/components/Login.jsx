import liff from "@line/liff";

function Login() {
    liff.login()
    if (liff.isLoggedIn()) {
        alert('User is logged in.')
    }

}

export default Login