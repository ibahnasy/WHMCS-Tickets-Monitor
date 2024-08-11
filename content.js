(function () {
    // Use the keywords passed from the background script
    const elements = document.querySelectorAll('html body div#contentarea.contentarea.sidebar-minimized div form div.tablebg table[id^="sortabletbl"].datatable tbody tr td span');
    var keyword_found = false;

    elements.forEach(element => {
        const elementText = element.innerText.trim();

        for (let keyword of keywords) {
            if (elementText.includes(keyword)) {
                keyword_found = true;
                return;
            }
        }
    });

    if (keyword_found) {
        browser.runtime.sendMessage({ keyword_found: true });
    }
})();
