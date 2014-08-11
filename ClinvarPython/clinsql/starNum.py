'''
Created on Aug 10, 2014

@author: Pflieger
'''

from collections import defaultdict 
import MySQLdb

def starNum():
    db = MySQLdb.connect("localhost", "root", "admin")
    cursor = db.cursor()
    cursor.execute ("USE clinvar_db")
    cursor.execute("SELECT DATE_CREATED, STAR_NUM FROM clinvar_data")
    stars = cursor.fetchall()


    starNum = []
    for items in stars:
        starNum.append(items[0:])
    
    counts = defaultdict(int)
    for item in starNum:
        counts[item[1]] += 1
        
    print counts
        
starNum()