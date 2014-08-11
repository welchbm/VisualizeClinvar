'''
Created on Aug 1, 2014

@author: Pflieger
'''
from collections import defaultdict 
import MySQLdb
import datetime
import matplotlib
import matplotlib.dates as mdates
from collections import defaultdict
from matplotlib import pylab
from pylab import *
import csv

def test():
    db = MySQLdb.connect("localhost", "root", "admin")

    cursor = db.cursor()

    cursor.execute("SELECT VERSION()")

    data = cursor.fetchone()
    print "Database version : %s " %data

    cursor.execute("SHOW TABLES FROM clinvar_db")
    tables = cursor.fetchall()
    print tables

    cursor.execute("SHOW COLUMNS FROM clinvar_data FROM clinvar_db")
    columns = cursor.fetchall()
    print columns

    db.close()
    
def history():
    db = MySQLdb.connect("localhost", "root", "admin")
    cursor = db.cursor()
    cursor.execute ("USE clinvar_db")
    cursor.execute("SELECT DATE_CREATED FROM clinvar_data")
    date = cursor.fetchall()
    
    date_list = []
    for items in date:
        date_list.append(items[0])
    sortDateList = sort(date_list)
  
    counts = defaultdict(int)
    for item in sortDateList:
        counts[item] += 1
    
    allDates = []
    allValues = []
    for key, value in counts.iteritems():
        allDates.append(key)
        allValues.append(value)

    addedValues = []
    for index, elem in enumerate(allValues):
        if index == 0:
            temp = elem
            addedValues.append(temp)
        else:
            temp += elem
            addedValues.append(temp)
    sortDates = sort(allDates)
    final = zip(sortDates, addedValues)
    final.insert(0,('date', 'number'))
    print final
    with open('history.tsv', 'wb') as f:
        w = csv.writer(f, delimiter='\t')
        w.writerows(final)
    
    db.close()
    

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
    
    Color = ['#2482c1', '#0c6197', '#4daa4b', '#90c469', '#daca61', 'e4a14b', '#e98125', '#cb2121', '#830909', '#923e99', '##ae83d5', '#bf27e3', '#ce2aeb', '#bca44a', '#618d1b', '#1ee67b', '#a4a0c9', '#322849', '#86f71a']
    
    str = ''
    for index in range(len(varType)): 
        str = str + '{"label": "%s"\r "value": %s\r "color": %s\r},\r' %(varType[index], values[index], Color[index])
    str = str[:-2]
        
    print str    
        
        
    
varType()
