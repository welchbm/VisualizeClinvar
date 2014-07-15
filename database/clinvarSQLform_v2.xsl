<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes"/>
<xsl:template match="/">INSERT INTO clinvar_db.clinvar_data(BATCHID, BATCHDATE, RCV, CLINVARSET_ID, REF_ASSERTION_ID, DATE_CREATED, DATE_LAST_UPDATED, PHENOTYPE, SNOMED_CODE, HPO_CODE, MEDGEN_CODE, GENE, DBVAR_DB, DBSNP_DB, OMIM_DB, VAR_TYPE, INTERPRETATION, STAR_NUM, HGVS_CODING, HGVS_GENOMIC, HGVS_PROTEIN, ASSEMBLY, CHR, ACCESSION, START_SEQ, STOP_SEQ) VALUES <xsl:for-each select="ReleaseSet/ClinVarSet"> 
('test3',
'2014-07-15',
'<xsl:value-of select="ReferenceClinVarAssertion/ClinVarAccession/@Acc"/>',
'<xsl:value-of select="@ID"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/@ID"/>',  
'<xsl:value-of select="ReferenceClinVarAssertion/@DateCreated"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/@DateLastUpdated"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/ElementValue[@Type='Preferred']"/>',    
'<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='SNOMED CT']/@ID"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='Human Phenotype Ontology']/@ID"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='MedGen']/@ID"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/Symbol/ElementValue"/>', 
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='dbVar']/@ID" />',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='dbSNP']/@ID" />',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='OMIM']/@ID" />',  
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/@Type"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/ClinicalSignificance/Description"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/ClinicalSignificance/ReviewStatus"/>',
'<xsl:choose> <!-- Choose HGVS refseq coding gene first, then non refseq if not available -->
    <xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, coding, RefSeq']">
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, coding, RefSeq']/@Change"/>
    </xsl:when>
    <xsl:otherwise>
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, coding']/@Change"/>
    </xsl:otherwise>
</xsl:choose>',     
'<xsl:choose> <!-- Choose HGVS refseq genomic gene first, then non refseq if not available -->
    <xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, genomic, RefSeqGene']">
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, genomic, RefSeqGene']/@Change"/>
    </xsl:when>
    <xsl:otherwise>
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, genomic']/@Change"/>
    </xsl:otherwise>
</xsl:choose>',    
'<xsl:choose> <!-- Choose HGVS refseq protein  first, then non refseq if not available -->
    <xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, protein, RefSeqGene']">
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, protein, RefSeqGene']/@Change"/>
    </xsl:when>
    <xsl:otherwise>
        <xsl:choose>
            <xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, protein']/@Change">
                <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, protein']/@Change"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, protein']"/> 
            </xsl:otherwise>
        </xsl:choose>       
    </xsl:otherwise>
</xsl:choose>',
'<xsl:choose>
    <xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@Assembly"> 
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@Assembly"/>
    </xsl:when>
    <xsl:otherwise>
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/SequenceLocation/@Assembly"/>
    </xsl:otherwise>    
</xsl:choose>',
'<xsl:choose>
    <xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@Chr"> 
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@Chr"/>
    </xsl:when>
    <xsl:otherwise>
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/SequenceLocation/@Chr"/>
    </xsl:otherwise>    
</xsl:choose>',
'<xsl:choose>
    <xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@Accession"> 
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@Accession"/>
    </xsl:when>
    <xsl:otherwise>
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/SequenceLocation/@Accession"/>
    </xsl:otherwise>    
</xsl:choose>',
'<xsl:choose>
    <xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@start"> 
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@start"/>
    </xsl:when>
    <xsl:otherwise>
        <xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/SequenceLocation/@start"/>
    </xsl:otherwise>    
</xsl:choose>',
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/SequenceLocation/@stop"/>')<xsl:choose>
    <xsl:when test="position() != last()">,</xsl:when>
</xsl:choose></xsl:for-each>;
</xsl:template>
</xsl:stylesheet>		
