import liff from "@line/liff";

function Scan() {
    if (liff.isLoggedIn()) {
        liff
            .scanCodeV2()
            .then((result) => {
                const userId = result.value;
                fetch('https://spectacular-gingersnap-be0b01.netlify.app/addScan', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred while adding the scan.');
                });
            })
            .error((err) => {
                console.log(`Error : ${err}`)
            })
    } else {
        alert("scanCodeV2の利用にはログインが必要です。")
    }
}

export default Scan