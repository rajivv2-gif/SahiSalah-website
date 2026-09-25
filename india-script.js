document.addEventListener('DOMContentLoaded', () => {

    // Scroll Reveal Interactions
    const reveals = document.querySelectorAll('.reveal');
    const exposeElements = () => {
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 50;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };
    window.addEventListener('scroll', exposeElements);
    exposeElements(); // Trigger on load

    // --- Chart.js Salary Trajectory Config ---
    const chartCanvas = document.getElementById('salaryProjectionChart');
    if (chartCanvas && typeof Chart !== 'undefined') {
        const ctx = chartCanvas.getContext('2d');

        // Base Datasets (Default: Engineering / IT)
        const datasets = {
            engineering: {
                india: [5, 6, 7.5, 9, 11, 13, 16, 18, 22, 25],
                uk: [35, 38, 42, 48, 55, 62, 70, 80, 92, 105],
                germany: [40, 45, 52, 60, 68, 78, 88, 100, 115, 130] // Lacs INR
            },
            mba: {
                india: [7, 8.5, 10, 12.5, 15, 18, 22, 26, 32, 40],
                uk: [30, 35, 42, 50, 60, 72, 85, 100, 115, 135],
                germany: [35, 40, 48, 56, 65, 75, 88, 102, 120, 140]
            },
            healthcare: {
                india: [3, 4, 5.5, 7, 9, 11, 14, 17, 21, 25],
                uk: [42, 45, 49, 54, 60, 68, 75, 84, 95, 110], // NHS highly structured
                germany: [38, 42, 48, 55, 62, 70, 80, 92, 105, 120]
            }
        };

        const labels = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'];

        const chartConfig = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '🇮🇳 India (Private Tier-2)',
                        data: datasets.engineering.india,
                        borderColor: '#f97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: '🇬🇧 UK / Aus',
                        data: datasets.engineering.uk,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: '🇩🇪 Germany (Public)',
                        data: datasets.engineering.germany,
                        borderColor: '#22c55e',
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        borderWidth: 4,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { font: { family: 'Outfit', size: 14 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + ': ₹' + context.parsed.y + ' Lacs';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Salary (In Lakhs INR)', font: { size: 14 } },
                        grid: { color: '#e2e8f0' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        };

        // Initialize Chart
        let globalChart = new Chart(ctx, chartConfig);

        // Make updateChart globally available
        window.updateChart = function (field) {
            // Update styling of buttons
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.currentTarget.classList.add('active');

            // Update Data
            globalChart.data.datasets[0].data = datasets[field].india;
            globalChart.data.datasets[1].data = datasets[field].uk;
            globalChart.data.datasets[2].data = datasets[field].germany;

            // Render
            globalChart.update();
        }
    }
});
