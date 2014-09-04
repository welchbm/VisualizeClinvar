var pie = new d3pie("pieChart", {
  "header": {
      "subtitle": {
          "color": "#999999",
          "fontSize": 12,
          "font": "helvetica"
      },
      "titleSubtitlePadding": 9
  },
  "footer": {
      "color": "#999999",
      "fontSize": 10,
      "font": "open sans",
      "location": "bottom-left"
  },
  "size": {
      "canvasWidth": 550,
      "pieInnerRadius": "34%",
      "pieOuterRadius": "90%"
  },
  "data": {
      "sortOrder": "value-desc",
      "content": [
      {"label": "protein only", "value": 77, "color": "#2482c1"},{"label": "inversion", "value": 3, "color": "#0c6197"},{"label": "Deletion", "value": 9942, "color": "#4daa4b"},{"label": "copy number gain", "value": 1927, "color": "#90c469"},{"label": "single nucleotide variant", "value": 93768, "color": "#daca61"},{"label": "Microsatellite", "value": 51, "color": "#e4a14b"},{"label": "copy number loss", "value": 2208, "color": "#e98125"},{"label": "Variation", "value": 528, "color": "#cb2121"},{"label": "Structural variant", "value": 1, "color": "#830909"},{"label": "fusion", "value": 8, "color": "#923e99"},{"label": "Indel", "value": 654, "color": "#ae83d5"},{"label": "Insertion", "value": 1437, "color": "#bf27e3"},{"label": "Duplication", "value": 2293, "color": "#ce2aeb"}
      ]
  },
  "labels": {
      "outer": {
          "pieDistance": 22
      },
      "inner": {
          "hideWhenLessThanPercentage": 3
      },
      "mainLabel": {
          "fontSize": 9
      },
      "percentage": {
          "color": "#ffffff",
          "decimalPlaces": 0
      },
      "value": {
          "color": "#adadad",
          "fontSize": 9
      },
      "lines": {
          "enabled": true
      }
  },
  "effects": {
      "pullOutSegmentOnClick": {
          "effect": "linear",
          "speed": 400,
          "size": 8
      }
  },
  "misc": {
      "gradient": {
          "enabled": true,
          "percentage": 100
      }
  }
});
