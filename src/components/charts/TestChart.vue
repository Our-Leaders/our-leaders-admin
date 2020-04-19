<template>
  <div ref="chartDiv" class="hello"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

export default {
  name: 'TestChart',
  data() {
    return {
      chart: '',
    };
  },
  mounted() {
    const chart = am4core.create(this.$refs.chartDiv, am4charts.XYChart);

    chart.numberFormatter.numberFormat = '#a';
    chart.dateFormatter.dateFormat = 'yyyy';

    chart.paddingRight = 0;
    chart.paddingLeft = 0;

    const data = [];
    let visits = 10;
    for (let i = 1; i < 31; i += 1) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10000);
      data.push({ date: new Date(2018, 0, i), name: `name${i}`, value: visits });
    }

    chart.data = data;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.grid.template.stroke = 0;
    dateAxis.renderer.labels.template.fontFamily = 'Circular Std';
    dateAxis.renderer.labels.template.fontSize = '14px';
    dateAxis.renderer.labels.template.fill = am4core.color('#969696');
    dateAxis.cursorTooltipEnabled = false;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.grid.template.stroke = am4core.color('#8e8e8e');
    valueAxis.renderer.opposite = true;
    valueAxis.renderer.labels.template.fontFamily = 'Circular Std';
    valueAxis.renderer.labels.template.fontSize = '14px';
    valueAxis.renderer.labels.template.fill = am4core.color('#969696');
    valueAxis.cursorTooltipEnabled = false;

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';

    series.tooltipText = `
    {dateX.value}
    {valueY.value}`;

    series.tooltip.getFillFromObject = false;

    series.tooltip.label.fill = am4core.color('#fff');
    series.tooltip.label.fontFamily = 'Circular Std';
    series.tooltip.label.fontSize = '14px';

    series.tooltip.background.fill = am4core.color('#C79947');

    // line stroke
    series.stroke = am4core.color('#000');

    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style lang="scss" scoped>
  .hello {
    width: 100%;
    height: 400px;
  }
</style>
