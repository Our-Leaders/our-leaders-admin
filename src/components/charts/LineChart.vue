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
    chartConfig: {
      type: Object,
      default: () => ({
        numberFormat: '#a',
        dateFormat: 'yyyy-MM-dd',
      }),
    },
  },
  data() {
    return {
      chart: '',
      chartSeries: null,
      dateAxis: null,
      valueAxis: null,
    };
  },
  watch: {
    seriesData(newData) {
      this.chart.data = newData;
      this.chart.invalidateRawData();
    },
    xAxisValue(newData) {
      this.chartSeries.dataFields.dateX = newData;
    },
    yAxisValue(newData) {
      this.chartSeries.dataFields.valueY = newData;
    },
    chartConfig(newData) {
      if (newData.numberFormat) {
        this.valueAxis.numberFormatter.numberFormat = newData.numberFormat;
      }

      if (newData.dateFormat) {
        this.dateAxis.dateFormatter.dateFormat = newData.dateFormat;
      }
    },
  },
  mounted() {
    const {
      numberFormat,
      dateFormat,
    } = this.chartConfig;
    const chart = am4core.create(this.$refs.chartDiv, am4charts.XYChart);

    // chart.dateFormatter.dateFormat = 'MMM dd yyyy';

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
    dateAxis.dateFormatter.dateFormat = dateFormat;
    dateAxis.baseInterval = {
      timeUnit: 'day',
      count: 1,
    };

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.grid.template.stroke = am4core.color('#8e8e8e');
    valueAxis.renderer.opposite = true;
    valueAxis.renderer.labels.template.fontFamily = 'Circular Std';
    valueAxis.renderer.labels.template.fontSize = '14px';
    valueAxis.renderer.labels.template.fill = am4core.color('#969696');
    // valueAxis.renderer.labels.
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.numberFormatter.numberFormat = numberFormat;
    // valueAxis.renderer.minGridDistance = 1000;

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = this.xAxisValue || 'date';
    series.dataFields.valueY = this.yAxisValue || 'value';

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

    this.chartSeries = series;
    this.chart = chart;
    this.dateAxis = dateAxis;
    this.valueAxis = valueAxis;
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
