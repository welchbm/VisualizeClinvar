<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:xs="http://www.w3.org/2001/XMLSchema"
exclude-result-prefixes="xs"
version="1.0">
<xsl:output omit-xml-declaration="yes"/>
<xsl:template match="/">

<!--<xsl:value-of select="ReleaseSet/ClinVarSet/ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef/@DB"></xsl:value-of> -->
<xsl:for-each select="ReleaseSet/ClinVarSet">                                
<xsl:for-each select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef">
<xsl:value-of select="@DB"></xsl:value-of><xsl:text>&#xa;</xsl:text>                  
</xsl:for-each>    
<xsl:for-each select="ReferenceClinVarAssertion/MeasureSet/Measure/Name/XRef">
<xsl:value-of select="@DB"></xsl:value-of><xsl:text>&#xa;</xsl:text> 
</xsl:for-each>

<!--          -\-Measure Xrefs-\-

<xsl:for-each select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef">
<xsl:value-of select="@DB"></xsl:value-of>,                 
</xsl:for-each> -->



</xsl:for-each>
<!--   <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef/@DB"></xsl:value-of>,  -->


</xsl:template>



</xsl:stylesheet>