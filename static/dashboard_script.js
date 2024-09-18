async function fetchDataAndRenderChart(
    apiEndpoint,
    chartElementId,
    chartConfig
) {
        try {
            let response = await fetch(apiEndpoint);
            let data = await response.json();
            const ctx = document.getElementById(chartElementId).getContext("2d");
            new Chart(ctx, chartConfig(data));
        } catch (error) { console.error("Error fetching or rendering chart:", error);
    }
}

// Orders Over Time Chart 1 
fetchDataAndRenderChart("/api/orders_over_time", "ordersChart", (data) => ({   //ordersChart = canvas id
    type: "line",
    data: {
      labels: data.dates,
      datasets: [
        {
          label: "Number of Orders",
          data: data.counts,
        },
      ],
    },
  }));

// Low Stock Levels Chart 2
fetchDataAndRenderChart("/api/low_stock_levels", "stockChart", (data) => ({
    type: "bar",
    data: {
      labels: data.products,
      datasets: [
        {
          label: "Low Stock",
          data: data.quantities,
          // ... other config
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          display: false, // This will hide the x-axis labels
        },
      },
    },
  }));

// Popular Products Chart 3
fetchDataAndRenderChart("/api/most_popular_products", "popularProductsChart", (data) => ({
    type: "bar",
    data: {
      labels: data.map((item) => item.product_name),
      datasets: [
        {
          label: "Quantity Sold",
          data: data.map((item) => item.total_quantity),
            // ... other config
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          display: false,
        },
      },
    },
  }));
  
// Popular Product Categoies Chart 4
fetchDataAndRenderChart("/api/product_category_popularity","categoryPopularityChart", (data) => ({
    type: "pie",
    data: {
      labels: data.categories,
      datasets: [
        {
          label: "Total Sales",
          data: data.sales,
              // ... other config
        },
      ],
    },
  }));

// Payment Method Popularity Chart 5
fetchDataAndRenderChart("/api/payment_method_popularity", "paymentMethodChart", (data) => ({
   type: "pie",
   data: {
      labels: data.methods,
      datasets: [
         {
          label: "Transaction Count",
          data: data.counts,
            // ... other config
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
           display: false, // This will hide the x-axis labels
        },
      },
    },
  }));

  // Revenue Generation Chart 6
  fetchDataAndRenderChart("/api/revenue_generation", "revenueChart", (data) => ({
    type: "line",
    data: {
      labels: data.dates,
      datasets: [
        {
          label: "Total Revenue",
          data: data.revenues,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)", // Optional: Change the border color of the bars
          borderWidth: 1
          // ... other config
        },
      ],
    },
    // ... other options
  }));

  // Best Product by Revenue Chart 7
fetchDataAndRenderChart("/api/best_product_revenue", "bestProductRevenue", (data) => ({
  type: "bar",
  data: {
    labels: data.products,
    datasets: [
      {
        label: "Total Revenue per Product",
        data: data.revenue,
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Change this to your desired color
        borderColor: "rgba(75, 192, 192, 1)", // Optional: Change the border color of the bars
        borderWidth: 1,
        // ... other config
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        display: true, 
      },
    },
  },
}));

// Cities With Most Orders Chart 8
fetchDataAndRenderChart("/api/orders_by_city", "ordersByCity", (data) => ({
  type: "pie",
  data: {
    labels: data.city, // Accessing the city data from the API response
    datasets: [
      {
        label: "Total Orders",
        data: data.total_orders,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ], 
        borderWidth: 1,
      },
    ],
  },
}));

// Total Number of Products Bought by City Chart 9
fetchDataAndRenderChart("/api/total_products_bought_by_city", "numberOfProductsBought", (data) => ({
  type: "bar",
  data: {
    labels: data.city, // Accessing the city data from the API response
    datasets: [
      {
        label: "Number of Product Bought",
        data: data.number_of_products_bought,
        borderWidth: 1,
      },
    ],
  },
}));

  // Temperature Over Time Chart 10
 fetchDataAndRenderChart("/api/temperature_over_time", "temperatureChart", (data) => ({
    type: "line",
    data: {
      labels: data.daily.time,
      datasets: [
        {
          label: "Temperature (°C)",
          data: data.daily.temperature_2m_max,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
     ],
   },
  }));
  