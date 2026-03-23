# Logger Configuration

import logging

# Create a logger
logger = logging.getLogger('antonio_logger')
logger.setLevel(logging.DEBUG)  # Set level to DEBUG to capture all types of log messages

# Create handlers
console_handler = logging.StreamHandler()
file_handler = logging.FileHandler('app.log')

# Set the log level for handlers
console_handler.setLevel(logging.INFO)
file_handler.setLevel(logging.ERROR)

# Create formatters and add them to handlers
console_formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
console_handler.setFormatter(console_formatter)
file_handler.setFormatter(file_formatter)

# Add handlers to the logger
logger.addHandler(console_handler)
logger.addHandler(file_handler)

# Example log messages
logger.debug('This is a debug message')
logger.info('This is an info message')
logger.error('This is an error message')
