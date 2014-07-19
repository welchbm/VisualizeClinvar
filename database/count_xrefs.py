__author__ = 'bmw-admin'

file=open("/home/bmw-admin/Dropbox/data/xrefs_measure.txt","r+")
xrefcount={}
for xref in file:
    '''print xref'''
    if xref not in xrefcount:
        xrefcount[xref] = 1
    else:
        xrefcount[xref] += 1
for k,v in xrefcount.items():
    print k, v
