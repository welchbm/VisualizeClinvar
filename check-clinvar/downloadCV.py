__author__ = 'brandon'

import os
import urllib2
import subprocess

#variables
url='ftp://ftp.ncbi.nlm.nih.gov/pub/clinvar/xml/'
gzname='ClinVarFullRelease_2014-08.xml.gz'
xmlname='ClinVarFullRelease_2014-08.xml'
sqlname='2014-08'
tablename='aug2014'
file_loc='~/Projects/VisualizeClinvar/downloads/'
xsl='/home/bmw-admin/Projects/VisualizeClinvar/database/xsl/clinvarSQLform_v3.xsl'

print "Downloading"
os.system("""wget -P %s %s%s""" %(file_loc,url,gzname))
os.system("""gunzip %s%s""" %(file_loc,gzname))

print "Cleaning"
os.system("""sed -n s/"'"/""/g <%s%s > %s%s.xml""" %(file_loc,xmlname,file_loc,sqlname))

print "Transforming"
os.system("""xsltproc -o /home/bmw-admin/Dropbox/CV-data/db/%s.sql %s %s%s"""%(sqlname, xsl, file_loc,xmlname))
os.system("""sed -n s/clinvar_data.clinvar_data/clinvar_data.%s/ /home/bmw-admin/Dropbox/CV-data/db/%s.sql"""%(tablename,sqlname))

print "File ready"






'''
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

file=open(filename, "a")
file.write("\n"+latest_release)
file.close()

'''