import unittest
from app import app


class TestApiEndpoints(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True


    def test_low_stock_levels(self):
        # Test 1: the low stock levels endpoint
        response = self.app.get('api/low_stock_levels')
        # Check the status code of the response is 200
        self.assertEqual(response.status_code, 200)

    def test_JSON(self):
        # Test 2: if the response is in JSON format
        response = self.app.get("api/low_stock_levels")
        self.assertTrue(response.is_json)

    def test_keys(self):
        # Test 3 if the response contains the expected keys
        response = self.app.get("api/low_stock_levels")
        self.assertTrue("products" in response.json)
        self.assertTrue("quantities" in response.json)

    def test_list(self):
        # Test 4 if the products response is a list
        response = self.app.get("api/low_stock_levels")
        self.assertIsInstance(response.json["products"], list)

    def test_integer(self):
        # Test 5 to see if quantities response is an integer
        response = self.app.get("api/low_stock_levels")
        self.assertTrue(all(isinstance(x, int) for x in response.json["quantities"]))


if __name__ == "__main__":
    unittest.main()