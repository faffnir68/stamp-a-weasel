import liff from "@line/liff";

function ShareTargetPicker() {
    if (liff.isLoggedIn()) {
        liff
            .shareTargetPicker(
                [
                    {
                        type: "text",
                        text: "Hello, World!",
                    },
                ]
            )
    } else {
        alert("shareTargetPickerの利用にはログインが必要です。")
    }
}

export default ShareTargetPicker