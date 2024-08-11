# WHMCS Tickets Monitor

## Description

The WHMCS Tickets Monitor is a Firefox extension that automatically monitors a specified WHMCS tickets page for specific keywords. The extension checks the page every minute, and if any of the defined keywords are found, it sends a notification alerting the user to a new ticket reply or status update.

Thus savings you the headache and money to use commercial WHMCS plugins or modify the backend code to do so.

## Features

- Monitor a specific URL for ticket-related keywords.
- Customize the URL and keywords via the extension's popup interface.
- Receive notifications with sound alerts when keywords are detected.

## Installation

1. Download the `.xpi` file for the extension.
2. Open Firefox and go to `about:addons`.
3. Click on the gear icon ⚙️ and select "Install Add-on From File...".
4. Choose the downloaded `.xpi` file to install the extension.

## Usage

1. Click on the extension icon in the Firefox toolbar.
2. Enter the URL of the WHMCS tickets page you want to monitor.
3. Enter the keywords to look for (comma-separated), or leave it empty,
   it will look for ["Open", "Acknowledge", "Customer-Reply"] by default.
4. Click "Save" to start monitoring.

## License

This project is licensed under GPLv3.
