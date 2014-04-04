__author__ = 'brandon'

import subprocess


app='wget'
mod='-P'
file_loc='~/projects/VisualizeClinvar/check-clinvar/clinvar-downloads/'
clinvar='ftp://ftp.ncbi.nlm.nih.gov/pub/clinvar/xml/ClinVarFullRelease_00-latest.xml.gz'
demo= 'https://www.gnu.org/software/wget/manual/wget.pdf'

args=[app,mod,file_loc,demo]
print args
p=subprocess.call(args)  #call in 2.7 popen in 2.6