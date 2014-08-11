'''
Created on Aug 10, 2014

@author: Pflieger
'''
from collections import defaultdict 
import MySQLdb
import csv

def varInterp():
    db = MySQLdb.connect("localhost", "root", "admin")
    cursor = db.cursor()
    cursor.execute ("USE clinvar_db")
    cursor.execute("SELECT INTERPRETATION FROM clinvar_data")
    varInterp = cursor.fetchall()
    
    interList = []
    for items in varInterp:
        interList.append(items[0])


    counts = defaultdict(int)
    for item in interList:
        counts[item] += 1
    
    interType = []
    values = []
    for key, value in counts.iteritems():
        interType.append(key)
        values.append(value)
    
    listSum = float(sum(values))
    frequency = []
    
    for s in values:
        frequency.append (s/listSum)
    
    final = zip(interType, frequency)
    final.insert(0,('Interpretation', 'frequency'))
    print final
    with open('varInterp.tsv', 'wb') as f:
        w = csv.writer(f, delimiter='\t')
        w.writerows(final)
    
    db.close()
    
varInterp()