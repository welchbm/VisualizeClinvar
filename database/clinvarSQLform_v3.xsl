<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output omit-xml-declaration="yes"/>
    <xsl:template match="/">INSERT INTO clinvar_db.clinvar_data(BATCHDATE, RCV, CLINVARSET_ID, DATE_CREATED, DATE_LAST_UPDATED, PHENOTYPE, OMIM_CODE, MEDGEN_CODE, GENALLIANCE_CODE, SNOMED_CODE, GENEREV_CODE, ORPHNET_CODE, ORD_CODE, MESH_CODE, HPO_CODE, GHR_CODE, GENETEST_CODE, GENE_CODE, UNISWISSPROT_CODE, EFO_CODE, ICD9_CODE, GENE, DBSNP_DB, DBVAR_DB, OMIM_DB, GENEREV_DB, UNISWISSPROT_DB, DBRBC_DB, NCBI_DB, GENE_DB, VAR_TYPE, INTERPRETATION, STAR_NUM, HGVS_CODING, HGVS_GENOMIC, HGVS_PROTEIN, ASSEMBLY, CHR, ACCESSION, START_SEQ, STOP_SEQ) VALUES <xsl:for-each select="ReleaseSet/ClinVarSet"> 
('2014-07-15',
'<xsl:value-of select="ReferenceClinVarAssertion/ClinVarAccession/@Acc"/>',
'<xsl:value-of select="@ID"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/@DateCreated"/>',
'<xsl:value-of select="ReferenceClinVarAssertion/@DateLastUpdated"/>',
<!-- TRAIT STUFF -->
'<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/ElementValue[@Type='Preferred']"/>',  
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='OMIM']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='OMIM']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='OMIM']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='MedGen']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='MedGen']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='MedGen']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Genetic Alliance']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Genetic Alliance']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='Genetic Alliance']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='SNOMED CT']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='SNOMED CT']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='SNOMED CT']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='GeneReviews']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='GeneReviews']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='GeneReviews']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Orphanet']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Orphanet']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='Orphanet']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Office of Rare Diseases']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Office of Rare Diseases']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='Office of Rare Diseases']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='MeSH']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='MeSH']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='MeSH']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Human Phenotype Ontology']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Human Phenotype Ontology']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='Human Phenotype Ontology']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Genetics Home Reference']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Genetics Home Reference']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='Genetics Home Reference']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='GeneTests']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='GeneTests']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='GeneTests']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Gene']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='Gene']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='Gene']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='UniProtKB/Swiss-Prot']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='UniProtKB/Swiss-Prot']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='UniProtKB/Swiss-Prot']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='EFO']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='EFO']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='EFO']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='ICD9']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/XRef[@DB='ICD9']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/XRef[@DB='ICD9']/@ID"/>
</xsl:otherwise>    
</xsl:choose>',    
<!-- MEASURE STUFF -->
'<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/Symbol/ElementValue"/>', 
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='dbSNP']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='dbSNP']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/Name/XRef[@DB='dbSNP']/@ID"/>
</xsl:otherwise>    
</xsl:choose>', 
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='OMIM']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='OMIM']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/Name/XRef[@DB='OMIM']/@ID"/>
</xsl:otherwise>    
</xsl:choose>', 
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='dbVar']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='dbVar']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/Name/XRef[@DB='dbVar']/@ID"/>
</xsl:otherwise>    
</xsl:choose>', 
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='GeneReviews']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='GeneReviews']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/Name/XRef[@DB='GeneReviews']/@ID"/>
</xsl:otherwise>    
</xsl:choose>', 
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='UniProtKB/Swiss-Prot']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='UniProtKB/Swiss-Prot']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/Name/XRef[@DB='UniProtKB/Swiss-Prot']/@ID"/>
</xsl:otherwise>    
</xsl:choose>', 
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='dbRBC']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='dbRBC']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/Name/XRef[@DB='dbRBC']/@ID"/>
</xsl:otherwise>    
</xsl:choose>', 
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='NCBI']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='NCBI']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/Name/XRef[@DB='NCBI']/@ID"/>
</xsl:otherwise>    
</xsl:choose>', 
'<xsl:choose>
<xsl:when test="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='Gene']/@ID"> 
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/XRef[@DB='Gene']/@ID"/>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/Name/XRef[@DB='Gene']/@ID"/>
</xsl:otherwise>    
</xsl:choose>', 
<!-- VARIATION STUFF -->
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
