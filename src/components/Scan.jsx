import liff from "@line/liff";

function Scan() {
    if (liff.isLoggedIn()) {
        liff
            .scanCodeV2()
            .then((result) => {
                const pageUrl = result.value;
                const context = liff.getContext();
                updateContentFromJsonFile(context.userId, pageUrl);

            })
            .error((err) => {
                console.log(`Error : ${err}`)
            })
    } else {
        alert("scanCodeV2の利用にはログインが必要です。")
    }
}

function updateContentFromJsonFile(userId) {
    fetch('/.netlify/functions/updateScans', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Data from updateScans:', data);

            if (Array.isArray(data)) {
                const existingEntry = data.find(entry => userId === entry.id);
                if (existingEntry) {
                    existingEntry.scanNb = (existingEntry.scanNb || 0) + 1;
                } else {
                    data.push({ userId: userId, scanNb: 1 });
                }
                writeDataToScansJson(data);
                updateUserIdOnHomepage(data.map(entry => entry.scanNb).join(', '));
            } else {
                console.error('Invalid data format:', data);
                alert('Error fetching or updating scans.json. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching scans.json:', error);
            alert('Error fetching or updating scans.json. Please try again.');
        });
}


function writeDataToScansJson(data) {
    fetch('/.netlify/functions/updateScans', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .catch(err => {
        alert(`Error updating scans.json: ${err}`)
    })
    console.log("Successfully update scans")
}

function updateUserIdOnHomepage(content) {
    const userIdDisplay = document.getElementById('userIdDisplay');
    userIdDisplay.textContent = `Content of scans.json: ${content}`;
    console.log('Content of scans.json displayed on the homepage successfully.');
}

export default Scan