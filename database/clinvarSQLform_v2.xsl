<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
INSERT INTO clinvar_db.clinvar_data(BATCHID, BATCHDATE, CLINVARSET_ID, DATE_CREATED, DATE_LAST_UPDATED, REF_ASSERTION_ID, PHENOTYPE, SNOMED_CODE, GENE, HGVS_CODING, HGVS_GENOMIC, HGVS_PROTEIN, ASSEMBLY, CHR, ACCESSION, START_SEQ, STOP_SEQ, VAR_TYPE, INTERPRETATION, STAR_NUM) VALUES <xsl:for-each select="ReleaseSet/ClinVarSet"> 
('test',
'2014-07-02',
'<xsl:value-of select="@ID"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/@DateCreated"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/@DateLastUpdated"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/@ID"/>',
'<xsl:if test="ReferenceClinVarAssertion/TraitSet/Trait/Name/ElementValue/@Type='Preferred'">
    <xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/ElementValue"/></xsl:if>',
'<xsl:for-each select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='SNOMED CT']">
    <xsl:value-of select="@ID"/>
</xsl:for-each>',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/Symbol/ElementValue"/>',
'<xsl:for-each select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, coding, RefSeq']">
    <xsl:value-of select="@Change"/>
</xsl:for-each>',
'<xsl:for-each select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, genomic, RefSeqGene']">
    <xsl:value-of select="@Change"/>
</xsl:for-each>',
'<xsl:for-each select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, protein']">
    <xsl:value-of select="@Change"/>
</xsl:for-each>',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@Assembly"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@Chr"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@Accession"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@start"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@stop"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/@Type"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/ClinicalSignificance/Description"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/ClinicalSignificance/ReviewStatus"/>'),</xsl:for-each>;         
     
</xsl:template>
</xsl:stylesheet>		
