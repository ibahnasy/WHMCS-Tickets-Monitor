function checkPage(tabId, keywords) {
    browser.tabs.executeScript(tabId, { code: 'var keywords = ' + JSON.stringify(keywords) + ';' }, () => {
        browser.tabs.executeScript(tabId, { file: 'content.js' });
    });
}

function monitorPage() {
    browser.storage.local.get(['urlToMonitor', 'keywordsToMonitor', 'monitoringSuspended']).then(result => {
        const urlToMonitor = result.urlToMonitor;
        const keywordsToMonitor = result.keywordsToMonitor || ["Open", "Acknowledge", "Customer-Reply"];
        const monitoringSuspended = result.monitoringSuspended || false;

        if (monitoringSuspended) {
            console.log('Monitoring is suspended.');
            return;
        }

        // Check if the URL is already open in any tab
        browser.tabs.query({ url: urlToMonitor }, (tabs) => {
            if (tabs.length > 0) {
                checkPage(tabs[0].id, keywordsToMonitor);
            } else {
                browser.tabs.create({ url: urlToMonitor }, (tab) => {
                    browser.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                        if (tabId === tab.id && changeInfo.status === 'complete') {
                            checkPage(tabId, keywordsToMonitor);
                            browser.tabs.onUpdated.removeListener(listener);
                        }
                    });
                });
            }
        });
    });
}

// Set the interval to check the page every minute
setInterval(monitorPage, 60000);

// Automatically start the monitoring when the extension is loaded
monitorPage();

browser.runtime.onMessage.addListener((message) => {
    if (message.keyword_found) {
        browser.notifications.create({
            "type": "basic",
            "iconUrl": browser.runtime.getURL("icons/icon.png"),
            "title": "WHMCS Monitor",
            "message": "New Ticket Reply.",
            "priority": 2
        });

        let audio = new Audio(browser.extension.getURL("sounds/mixkit-bell-notification-933.wav"));
        audio.play();
    }
});
