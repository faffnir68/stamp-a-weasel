import liff from "@line/liff";

function Scan() {
    
    if (liff.isLoggedIn()) {
        liff
            .scanCodeV2()
            .then((result) => {
                const pageUrl = result.value;
                const context = liff.getContext();
                if (isValidUrl(pageUrl)) {
                    updateContentFromJsonFile(context.userId, pageUrl);
                } else {
                    console.log('Invalid URL:', pageUrl);
                    alert('Invalid URL. Please scan a valid QR code.');
                }
            })
            .catch((err) => {
                console.log(`Scancode failed : ${err}`)
            })
    } else {
        alert("scanCodeV2の利用にはログインが必要です。")
    }

    function isValidUrl(url) {
        return url.startsWith("https://spectacular-gingersnap-be0b01.netlify.app/addScan");
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
                console.log(data)
                const existingEntry = data.find(entry => userId === entry.userId);
                const existingIndex = data.findIndex(entry => userId === entry.userId);
                if (existingIndex !== -1) {
                    data[existingIndex].scanNb = (data[existingIndex].scanNb || 0) + 1;
                } else {
                    data.push({ userId: userId, scanNb: 1 });
                }
                const filteredData = data.filter(entry => entry.userId !== userId);
                const updatedData = [...filteredData, existingEntry || { userId: userId, scanNb: 1 }];
                // deleteScans(data);
                updateScanNbOnHomepage(updatedData.map(entry => entry.scanNb).join(', '));
                writeDataToScansJson(updatedData);
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
        method: 'PUT',
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

function deleteScans(data) {
    fetch('/.netlify/functions/updateScans', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .catch(err => {
        alert(`Error deleting scans.json: ${err}`)
    })
    console.log("Successfully delete scans")
}

function updateScanNbOnHomepage(content) {
    const userIdDisplay = document.getElementById('userIdDisplay');
    userIdDisplay.textContent = `Content of scans.json: ${content}`;
    console.log('Content of scans.json displayed on the homepage successfully.');
}

export default Scan