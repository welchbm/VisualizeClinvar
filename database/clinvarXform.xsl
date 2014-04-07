<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<xsl:text>&#xa;</xsl:text>
	<list>
	<xsl:text>&#xa;</xsl:text>
	<xsl:for-each select="ReleaseSet/ClinVarSet">
		<row>
			<field name='CLINVARSET_ID'><xsl:value-of select="@ID"/></field> <!--new -->
			<field name='GENE'><xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/MeasureRelationship/Symbol/ElementValue"/></field>
			<field name='DATE_CREATED'><xsl:value-of select="ReferenceClinVarAssertion/@DateCreated"/></field>
			<field name='DATE_UPDATED'><xsl:value-of select="ReferenceClinVarAssertion/@DateLastUpdated"/></field>
			<xsl:if test="ReferenceClinVarAssertion/TraitSet/Trait/Name/ElementValue/@Type='Preferred'">
				<field name='PHENOTYPE'><xsl:value-of select="ReferenceClinVarAssertion/TraitSet/Trait/Name/ElementValue"/></field>
			</xsl:if>
			<field name='VAR_TYPE'><xsl:value-of select="ReferenceClinVarAssertion/MeasureSet/Measure/@Type"/></field>
			<field name='SNP_TYPE'></field>
			<field name='INTERPRETATION_STARTNUM'><xsl:value-of select="ReferenceClinVarAssertion/ClinicalSignificance/ReviewStatus"/></field>
			<field name='INTERPRETATION'><xsl:value-of select="ReferenceClinVarAssertion/ClinicalSignificance/Description"/></field>
			<field name='SUBMISSION_TYPE'>TBD</field>
			<field name='SUBMITTER'><xsl:value-of select="ClinVarAssertion/ClinVarSubmissionID/@submitter"/></field>
			<field name='BATCHID'>update on import</field>
		</row>
		<xsl:text>&#xa;</xsl:text>
	</xsl:for-each>	
	</list>
</xsl:template>
</xsl:stylesheet>		
			
			