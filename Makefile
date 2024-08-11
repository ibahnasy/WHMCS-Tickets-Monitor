# Define the output .xpi file name
XPI_NAME = whmcs-tickets-monitor.xpi

# Define the files and directories to include in the .xpi
FILES = manifest.json background.js content.js popup.html popup.js icons/ sounds/

# Default target
all: $(XPI_NAME)

# Target to create the .xpi file
$(XPI_NAME): $(FILES)
	zip -r $(XPI_NAME) $(FILES)

# Target to clean up the generated .xpi file
clean:
	rm -f $(XPI_NAME)

# Phony targets
.PHONY: all clean
