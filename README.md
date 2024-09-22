# E-Commerce Data Dashboard for Corndel DT402

Welcome to my data dashboard repository. This forms part of my Corndel DT402 module assessment. 
Name: emily.gusterson@gmail.com

## Features

- Interactive data visualizations (e.g., doughnut charts, line charts).
- Fetches data from APIs and databases.
- Responsive design for different screen sizes.
- User-friendly interface for exploring data.

## Technologies Used
- Backend: Flask
- Frontend: HTML, CSS, JavaScript
- Data Visualization: Chart.js
- Database: SQLite

## To Note (also seen in pull request comments)
Python encountered an SSL certificate verification issue when making a request to the Open-Meteo API, despite being able to access the API from my browser. Since updating certifi didn’t resolve the issue, I bypassed SSL verification in Python for local testing. 

Solution: Disable SSL Verification in Python Requests. To bypass the SSL verification issue for testing purposes, I modified the API request in the Python Flask app to disable SSL verification by setting verify=False in the requests.get() call. The verify=False parameter in requests.get() disables SSL verification. This is useful for development but should not be used in production, as it makes the connection less secure. 

Suppress SSL Warnings: The InsecureRequestWarning is suppressed by calling requests.packages.urllib3.disable_warnings(InsecureRequestWarning). This prevents the warning about unverified HTTPS requests from being logged. 
