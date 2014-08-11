'''
Created on Aug 4, 2014

@author: Pflieger
'''

from collections import defaultdict 
import MySQLdb

def varType():
    db = MySQLdb.connect("localhost", "root", "admin")
    cursor = db.cursor()
    cursor.execute ("USE clinvar_db")
    cursor.execute("SELECT VAR_TYPE FROM clinvar_data")
    varType = cursor.fetchall()
    
    
    varList = []
    for items in varType:
        varList.append(items[0])

    counts = defaultdict(int)
    for item in varList:
        counts[item] += 1

    varType = []
    values = []
    for key, value in counts.iteritems():
        varType.append(key)
        values.append(value)
    
    Color = ['#2482c1', '#0c6197', '#4daa4b', '#90c469', '#daca61', '#e4a14b', '#e98125', '#cb2121', '#830909', '#923e99', '#ae83d5', '#bf27e3', '#ce2aeb', '#bca44a', '#618d1b', '#1ee67b', '#a4a0c9', '#322849', '#86f71a']
    
    data = ''
    for index in range(len(varType)): 
        data = data + '{\r"label": "%s",\r "value": %s,\r "color": "%s"\r},\r' %(varType[index], values[index], Color[index])
    data = data[:-2]
    
    html1 = """<html>
               <head></head>
               <body>

               <div id="pieChart"></div>

               <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.4/d3.min.js"></script>
               <script src="d3pie.min.js"></script>
               <script>
               var pie = new d3pie("pieChart", {
                "header": {
                    "title": {
                        "text": "Variant Type",
                        "fontSize": 24,
                        "font": "helvetica"
                    },
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
                    "canvasWidth": 600,
                    "pieInnerRadius": "34%",
                    "pieOuterRadius": "90%"
                },
                "data": {
                    "sortOrder": "value-desc",
                    "content": [
                    """
    html2 = """
                    ]
                },
                "labels": {
                    "outer": {
                        "pieDistance": 32
                    },
                    "inner": {
                        "hideWhenLessThanPercentage": 3
                    },
                    "mainLabel": {
                        "fontSize": 11
                    },
                    "percentage": {
                        "color": "#ffffff",
                        "decimalPlaces": 0
                    },
                    "value": {
                        "color": "#adadad",
                        "fontSize": 11
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
            </script>

    </body>
    </html>"""
      
    html = html1 + data +html2
    varType_file = open ("varType.html", "w")
    varType_file.write (html)
    varType_file.close()
    
varType()
