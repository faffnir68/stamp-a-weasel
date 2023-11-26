import liff from "@line/liff";

function Scan() {
    if (liff.isLoggedIn()) {
        liff
            .scanCodeV2()
            .then((result) => {
                alert(result.value)
            })
            .error((err) => {
                console.log(`Error : ${err}`)
            })
    } else {
        alert("scanCodeV2の利用にはログインが必要です。")
    }
}

export default Scan