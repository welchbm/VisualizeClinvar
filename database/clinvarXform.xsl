<?xml version="1.0" encoding="ISO-8859-1"?><!--test-->

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<xsl:text>&#xa;</xsl:text>
	<list>
	<xsl:text>&#xa;</xsl:text>
	<xsl:for-each select="ReleaseSet/ClinVarSet">
		<row>
			<field name='BATCHID'>enter the batchid here here</field>
			<field name='FILENAME'>enter the file name here</field>
			<field name='BATCHDATE'>enter the batchid date here</field>
			<field name='CLINVARSET_ID'><xsl:value-of select="@ID"/></field> <!--new -->
			<field name='DATE_CREATED'><xsl:value-of select="ReferenceClinVarAssertion/@DateCreated"/></field>
			<field name='DATE_UPDATED'><xsl:value-of select="ReferenceClinVarAssertion/@DateLastUpdated"/></field>			
			<xsl:if test="ReferenceClinVarAssertion/TraitSet/Trait/Name/ElementValue/@Type='Preferred'">
				<field name='PHENOTYPE'><xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/ElementValue"/></field>
			</xsl:if>
			<field name='GENE'><xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/Symbol/ElementValue"/></field>
			<xsl:for-each select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, coding, RefSeq']">
				<field name='HGVS_CODING'><xsl:value-of select="@Change"/></field>
			</xsl:for-each>
			<xsl:for-each select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, genomic, RefSeqGene']">
				<field name='HGVS_GENOMIC'><xsl:value-of select="@Change"/></field>
			</xsl:for-each>
			<xsl:for-each select="ReferenceClinVarAssertion/MeasureSet/Measure/AttributeSet/Attribute[@Type='HGVS, protein']">
				<field name='HGVS_PROTEIN'><xsl:value-of select="@Change"/></field>
			</xsl:for-each>
			<field name='ASSEMBLY'><xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/SequenceLocation/@Assembly"/></field>
			<field name='CHR'><xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/SequenceLocation/@Chr"/></field>
			<field name='ACCESSION'><xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/SequenceLocation/@Accession"/></field>
			<field name='START'><xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/SequenceLocation/@start"/></field>
			<field name='STOP'><xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/SequenceLocation/@stop"/></field>
			<field name='VAR_TYPE'><xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/@Type"/></field>
			<field name='INTERPRETATION'><xsl:value-of select="ReferenceClinVarAssertion/ClinicalSignificance/Description"/></field>
			<field name='STARTNUM'><xsl:value-of select="ReferenceClinVarAssertion/ClinicalSignificance/ReviewStatus"/></field>

		</row>
		<xsl:text>&#xa;</xsl:text>
	</xsl:for-each>	
	</list>
</xsl:template>
</xsl:stylesheet>		
			
			