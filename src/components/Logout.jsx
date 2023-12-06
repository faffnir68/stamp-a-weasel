import liff from "@line/liff";

function Logout() {
    liff.logout()
    location.reload()
}

export default Logout