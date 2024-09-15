"""
This script uses the sqlite3 module to interact with an SQLite database.
"""
import sqlite3
import pathlib
from flask import Flask, jsonify, render_template, Response
"""
This module sets up a Flask web application and provides endpoints for rendering
templates and returning JSON responses.
"""

working_directory = pathlib.Path(__file__).parent.absolute()
DATABASE = working_directory / 'CCL_ecommerce.db'
#database variable holds the location of the database

# function that connects to the SQLite database, executs a query and returns the results
# functton simplifies repetitive tasks and ensures a consistent approach to querying the database

def query_db(query: str, args=()) -> list:
    """
    Executes a SQL query on the database and returns the results.

    Args:
        query (str): The SQL query to execute.
        args (tuple): Optional arguments for the SQL query.

    Returns:
        list: A list of results fetched from the database.
    """
    with sqlite3.connect(DATABASE)as conn:
        cursor = conn.cursor()  #creates a cursor object. a tool that interacts directly with the database
        result = cursor.execute(query, args).fetchall() #this executes the sql query and fetches the results
    return result



app = Flask(__name__)  #creates an instance of the flask application. This instance is what we'll use to define routes and handle requests.

#the name variable is a built-in Python variable, letting Flask know where to look for resources
#the instance acts as a central controller, orchestrating the various functionalities of our web application

#our Flask applicaiton recongises different routes and delivers the corresponding content or data
#The route @app.route("/") serves the main dashboard by using the render_template function to render the dashboard.html template.
@app.route("/")
def index() -> str:
    """
    Renders the dashboard HTML template for the homepage.
    Returns:
        str: The rendered 'dashboard.html' template.
    """
    return render_template('dashboard.html')

@app.route("/api/orders_over_time")
def orders_over_time() -> Response:
    """
    Fetches the number of orders per date from the database and returns
    the data as a JSON response.

    Returns:
        Response: A JSON object with order dates and corresponding order counts.
    """
    query = """
    SELECT order_date, COUNT(order_id) AS num_orders
    FROM orders
    GROUP BY order_date
    ORDER BY order_date;
    """
    result = query_db(query)

    dates = [row[0] for row in result]
    counts = [row[1] for row in result]
    return jsonify({"dates": dates, "counts": counts})


# Register a route in Flask to handle requests to "/api/low_stock_levels"
@app.route("/api/low_stock_levels")
# Define the endpoint function that returns a Flask Response object
def low_stock_levels() -> Response:
    """
    Fetches the product names and their stock quantities from the database,
    ordered by stock level in ascending order, and returns the data as a JSON response.

    Returns:
        Response: A JSON object with product names and corresponding stock quantities.
    """
    # Define the SQL query string
    query = """
    SELECT p.product_name, s.quantity       
    FROM stock_level s                      
    JOIN products p ON s.product_id = p.product_id 
    ORDER BY s.quantity ASC;                
    """
    #Execute the query and store the results
    result = query_db(query)

    # Extract product names from the result
    products = [row[0] for row in result]
    # Extract quantities from the result
    quantities = [row[1] for row in result]

    # Return the results as a JSON response
    return jsonify({"products": products, "quantities": quantities})


# API end point created/route registered in Flask to handle requsts to "/api/most_popular_products"
@app.route("/api/most_popular_products")
def most_popular_products() -> Response:
    """
    Fetches the top 10 most popular products based on quantity ordered
    from the database and returns the data as a JSON response.

    Returns:
        Response: A JSON object with product IDs, names, and total quantities ordered.
    """
    query = """
    SELECT p.product_id, p.product_name, SUM(od.quantity_ordered) AS total_quantity
    FROM order_details od
    JOIN products p ON od.product_id = p.product_id
    GROUP BY p.product_id, p.product_name
    ORDER BY total_quantity DESC
    LIMIT 10;
    """
    # Execute the query and store the results
    result = query_db(query)

    products = [
        {"product_id": row[0], "product_name": row[1], "total_quantity": row[2]}
        for row in result
    ]
    return jsonify(products)

# TODO: Add a dropdown to the dashboard to select a product category

#running the application. Launch our Flask app server, making it live and ready to respond to incoming API requests
if __name__ == '__main__':
    app.run(debug=True)
#the debug=True arguement allows for real time code changes to reflect without restarting our server. This makes development much smoother.
#This mode should NOT be used in production environments as it can expose sensitive data and may allow unauthorised code execution.
#if in productiod, debug=False arguement should be defined and other deployment methods should be used to ensure security and scalability.
