__author__ = 'brandon'

import os
from bs4 import BeautifulSoup
import urllib2
import re
import subprocess

##File data
filename = "history.txt"
#how to get relative?
file=open(filename, "r")
data=file.readlines()
last_download= data[-1]

#ClinVar data
url="ftp://ftp.ncbi.nlm.nih.gov/pub/clinvar/xml/"
soup= BeautifulSoup(urllib2.urlopen(url))
all_rel= soup.p.string
search=re.compile(r"""[A-Z][a-z]{2,2}\s{1,2}[0-9]{1,2}\s{1,2}[0-9]{1,2}:[0-9]{1,2}""")
latest_release = search.findall(all_rel)[0]

#print url+'ClinVarFullRelease_00-latest.xml.gz'
#urllib2.urlopen(url+'ClinVarFullRelease_00-latest.xml.gz')

print last_download
print latest_release

if last_download == latest_release:
    print 'Its a match'
    pass
else:
    print "Downloading"
    #subprocess.call("wget ftp://ftp.ncbi.nlm.nih.gov/pub/clinvar/xml/ClinVarFullRelease_00-latest.xml.gz")
    #subprocess.call(gunzip the downloaded file)
    #subprocess.call(xsltproc downloaded file)
    file=open(filename, "a")
    file.write("\n"+latest_release)
    file.close()
# ss



