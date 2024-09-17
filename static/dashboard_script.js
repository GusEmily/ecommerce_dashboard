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
  type: "doughnut",
  data: {
     labels: data.city,
     datasets: [
        {
         label: "Total Orders",
         data: data.total_orders,
         backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ], 
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ],
        borderWidth: 1,
       },
     ],
   },
   options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,  // Show legend for the chart
        position: 'top',  // Position of the legend
      },
      tooltip: {
        enabled: true,  // Show tooltips on hover
      },
    },
    cutout: '70%',
   },
 }));

  
  // Temperature Over Time Chart
  // fetchDataAndRenderChart(
 //   "/api/temperature_over_time",
 //   "temperatureChart",
 //   (data) => ({
 //     type: "line",
 //     data: {
 //       labels: data.daily.time,
 //       datasets: [
 //         {
 //           label: "Temperature (°C)",
 //           data: data.daily.temperature_2m_max,
 //           borderColor: "rgba(255, 0, 0, 1)",
 //           backgroundColor: "rgba(200, 0, 192, 0.2)",
 //           fill: false,
 //         },
 //       ],
 //     },
      // ... other options can be added as needed
 //   })
 // );
  