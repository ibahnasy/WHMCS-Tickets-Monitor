document.getElementById('save').addEventListener('click', () => {
    const url = document.getElementById('url').value.trim();
    const keywords = document.getElementById('keywords').value.trim().split(',');

    // Save the URL and keywords in the browser's storage
    browser.storage.local.set({
        urlToMonitor: url,
        keywordsToMonitor: keywords
    }).then(() => {
        alert('Settings saved!');
    });
});

document.getElementById('suspend').addEventListener('click', () => {
    // Set the monitoring status to suspended
    browser.storage.local.set({ monitoringSuspended: true }).then(() => {
        alert('Monitoring suspended.');
    });
});

document.getElementById('resume').addEventListener('click', () => {
    // Set the monitoring status to resumed
    browser.storage.local.set({ monitoringSuspended: false }).then(() => {
        alert('Monitoring resumed.');
    });
});

// Load and display previously saved settings
document.addEventListener('DOMContentLoaded', () => {
    browser.storage.local.get(['urlToMonitor', 'keywordsToMonitor', 'monitoringSuspended']).then(result => {
        if (result.urlToMonitor) {
            document.getElementById('url').value = result.urlToMonitor;
        }
        if (result.keywordsToMonitor) {
            document.getElementById('keywords').value = result.keywordsToMonitor.join(',');
        }
        if (result.monitoringSuspended) {
            document.getElementById('suspend').disabled = true;
            document.getElementById('resume').disabled = false;
        } else {
            document.getElementById('suspend').disabled = false;
            document.getElementById('resume').disabled = true;
        }
    });
});
