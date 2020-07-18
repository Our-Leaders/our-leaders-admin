<template>
  <div id="mapDiv" ref="mapDiv" class="mapDiv" :style="{ 'height': `${height}px` }"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

export default {
  name: 'Map',
  props: {
    height: {
      type: Number,
      default: 400,
    },
    seriesData: {
      validator(value) {
        return Array.isArray(value);
      },
    },
  },
  watch: {
    seriesData(newData) {
      this.series.data = newData;
    },
  },
  data() {
    return {
      chart: null,
      series: null,
    };
  },
  mounted() {
    const chart = am4core.create(this.$refs.mapDiv, am4maps.MapChart);

    chart.geodata = am4geodataWorldLow;

    chart.projection = new am4maps.projections.Miller();

    chart.maxZoomLevel = 1;

    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ['AQ'];
    polygonSeries.useGeodata = true;

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.polygon.fillOpacity = 0.8;
    polygonTemplate.polygon.fill = am4core.color('#C5C5C5');

    // const hs = polygonTemplate.states.create('hover');
    // hs.properties.fill = '#C79947';
    // hs.properties.fill = chart.colors.getIndex(0);

    // Add image series
    const imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.mapImages.template.propertyFields.longitude = 'longitude';
    imageSeries.mapImages.template.propertyFields.latitude = 'latitude';
    imageSeries.dataFields.value = 'value';
    // imageSeries.mapImages.template.tooltipText = '{title}\n{value} visitors';
    imageSeries.mapImages.template.tooltipHTML = `<p style="font-size: 13px;">{city}, {country}</p>
    <p style="font-size: 11px;">{value} visitors</p>`;
    imageSeries.tooltip.getFillFromObject = false;
    imageSeries.tooltip.label.fill = am4core.color('#000000');
    imageSeries.tooltip.label.fontFamily = 'Circular Std';
    // imageSeries.tooltip.label.fontSize = '14px';
    imageSeries.tooltip.background.strokeWidth = '0px';
    // imageSeries.tooltip.background.filters.clear();
    imageSeries.tooltip.background.fill = am4core.color('#ffffff');

    const circle = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle.radius = 3;
    circle.nonScaling = false;
    circle.fill = '#F96D00';

    imageSeries.data = this.seriesData;

    this.chart = chart;
    this.series = imageSeries;
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style>
  .mapDiv {
    width: 100%;
    /* height: 400px; */
    overflow: hidden;
  }
</style>
