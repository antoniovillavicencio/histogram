// jshint esversion:6

// Selectors

let histogram = document.querySelector("#histogram");
let graphBtn = document.querySelector("#graphBtn");
let inputData = document.querySelector("#data");

// Event Listeners

graphBtn.addEventListener('click', (e) => {
    e.preventDefault();
    calculateHistogram();
});

window.addEventListener('resize', (e) => {
    e.preventDefault();
    calculateHistogram();
});

// Functions

function calculateHistogram() {
    histogram.innerHTML = '';
    // Parse data to an array
    let dataArr = inputData.value.split(',');
    // Validate array
    if (dataArr.length <= 1 || dataArr.some(isNaN)) {
        alert('Please enter at least 2 numbers. Only numbers and commas allowed');
        return;
    }

    let graphWidth = histogram.offsetWidth;
    let graphHeight = histogram.offsetHeight - 30;


    // Calculate array of ocurrencies (histogram)
    let hist = {};
    let bins = dataArr.filter((bin, index, arr) => arr.indexOf(bin) === index).sort((a, b) => a - b);

    console.log(bins);

    // Validate that we dont have more columns than pixels
    let dataLength = bins.length;
    if (dataLength > graphWidth) {
        alert('The maximum number of values allowed is ' + graphWidth);
        return;
    }

    // Count occurrencies
    bins.forEach(bin => {
        hist[bin] = dataArr.filter(data => data == bin).length;
    });

    // Calculate column width
    let columnWidth = Math.floor((graphWidth - 100) / dataLength);


    let maxVal = 1;
    for (let val in hist) {
        if (hist[val] > maxVal) maxVal = hist[val];
    }
    console.log(hist);

    // Normalize values
    for (let val in hist) {
        let counts = Math.floor(hist[val] * graphHeight / maxVal);
        let node = document.createElement('DIV');
        node.classList.add('dataColumn');
        histogram.appendChild(node);
        node.style.width = `${columnWidth}px`;
        node.style.height = `${0}px`;
        node.style.height = `${counts}px`;
        node.innerHTML = `<p>${val}</p>`;
        console.log('Child appended');
    }
}