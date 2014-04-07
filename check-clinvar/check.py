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
latest_release = str(search.findall(all_rel)[0])

# print last_download
# print latest_release

#File system variables
new_name=latest_release.translate(None,': ')
file_loc='~/projects/VisualizeClinvar/check-clinvar/clinvar-downloads/'
cv='ftp://ftp.ncbi.nlm.nih.gov/pub/clinvar/xml/ClinVarFullRelease_00-latest.xml.gz'

# print new_name

if last_download == latest_release:
    print 'Its a match'
    pass
else:
    print "Downloading"
    os.system("""wget -P %s -O clinvar-downloads/%s.xml.gz %s""" %(file_loc,new_name,cv))
    os.system("""gunzip %s%s.xml.gz""" %(file_loc,new_name))
    #subprocess.call("""xsltproc -o [output_file.xml] [xform.xslt] [downloaded_file.xml]""")

    file=open(filename, "a")
    file.write("\n"+latest_release)
    file.close()
# ss



