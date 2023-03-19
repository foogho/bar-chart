async function getDataset() {
  const res = await fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  );
  return (await res.json()).data;
}

(async () => {
  const dataset = await getDataset();
  const GDPs = [],
    datesByYear = [];
  dataset.forEach((data) => {
    // dates format are yy-mm-dd , here we only need the year
    datesByYear.push(+data[0].split('-')[0]);
    GDPs.push(data[1]);
  });
  const width = 700,
    height = 500,
    margin = 40;
  const chart = d3
    .select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  const scaleY = d3
    .scaleLinear()
    .domain([0, d3.max(GDPs)])
    .range([height - margin, margin]);
  const scaleX = d3
    .scaleLinear()
    .domain([d3.min(datesByYear), d3.max(datesByYear)])
    .range([margin, width - margin]);
  const xAxis = d3.axisBottom(scaleX).tickFormat((d) => d);
  const yAxis = d3.axisLeft(scaleY);
  chart
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0,${height - margin})`)
    .call(xAxis);
  chart
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${margin},0)`)
    .call(yAxis);
})();
