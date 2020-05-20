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
  name: 'LineChart',
  props: {
    seriesData: {
      validator(value) {
        return Array.isArray(value);
      },
    },
    xAxisValue: String,
    yAxisValue: String,
  },
  data() {
    return {
      chart: '',
      chartSeries: null,
    };
  },
  watch: {
    seriesData(newData) {
      this.chart.data = newData;
      this.chart.invalidateRawData();
    },
  },
  mounted() {
    const chart = am4core.create(this.$refs.chartDiv, am4charts.XYChart);

    chart.dateFormatter.dateFormat = 'MMM dd yyyy';

    chart.paddingRight = 0;
    chart.paddingLeft = 0;

    chart.data = this.seriesData || [];

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.grid.template.stroke = 0;
    dateAxis.renderer.labels.template.fontFamily = 'Circular Std';
    dateAxis.renderer.labels.template.fontSize = '14px';
    dateAxis.renderer.labels.template.fill = am4core.color('#969696');
    dateAxis.cursorTooltipEnabled = false;
    dateAxis.dateFormatter = new am4core.DateFormatter();
    dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd';

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.grid.template.stroke = am4core.color('#8e8e8e');
    valueAxis.renderer.opposite = true;
    valueAxis.renderer.labels.template.fontFamily = 'Circular Std';
    valueAxis.renderer.labels.template.fontSize = '14px';
    valueAxis.renderer.labels.template.fill = am4core.color('#969696');
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.numberFormatter.numberFormat = '#a';

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = this.xAxisValue || 'date';
    series.dataFields.valueY = this.yAxisValue || 'value';
    // series.dataFields.dateX = 'date';
    // series.dataFields.valueY = 'value';

    series.tooltipText = '{dateX}\n{valueY}';

    series.tooltip.getFillFromObject = false;

    series.tooltip.label.fill = am4core.color('#fff');
    series.tooltip.label.fontFamily = 'Circular Std';
    series.tooltip.label.fontSize = '14px';
    series.tooltip.background.strokeWidth = '0px';
    series.tooltip.background.filters.clear();

    series.tooltip.background.fill = am4core.color('#C79947');

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.fill = '#C79947';
    bullet.circle.strokeWidth = 2;
    bullet.fillOpacity = 0;
    bullet.strokeOpacity = 0;

    const bulletState = bullet.states.create('hover');
    bulletState.properties.fillOpacity = 1;
    bulletState.properties.strokeOpacity = 1;

    // line stroke
    series.stroke = am4core.color('#000');

    chart.cursor = new am4charts.XYCursor();

    // this.chartSeries = series;
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
