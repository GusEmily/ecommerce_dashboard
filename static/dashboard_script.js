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