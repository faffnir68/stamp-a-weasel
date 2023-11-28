import liff from "@line/liff";

function Scan() {
    if (liff.isLoggedIn()) {
        liff
            .scanCodeV2()
            .then((result) => {
                const pageUrl = result.value;
                const context = liff.getContext();
                // updateUserIdOnHomepage(pageUrl, context.userId);
                updateContentFromJsonFile(context.userId);

            })
            .error((err) => {
                console.log(`Error : ${err}`)
            })
    } else {
        alert("scanCodeV2の利用にはログインが必要です。")
    }
}

function updateContentFromJsonFile(userId) {
    fetch('/scans.json')
        .then(response => response.json())
        .then(data => {
            const userIds = data.map(entry => entry.userId);
            updateUserIdOnHomepage(userIds.join(', '));
        })
        .catch(error => {
            console.error('Error fetching scans.json:', error);
        });
}

function updateUserIdOnHomepage(url, userId) {
    // Assuming you have a div with the id 'userIdDisplay'
    const userIdDisplay = document.getElementById('userIdDisplay');

    // Update the content of the div with the userId
    userIdDisplay.textContent = `Content of scans.json: ${content}`;

    console.log('Url displayed on the homepage successfully.');
}

export default Scan