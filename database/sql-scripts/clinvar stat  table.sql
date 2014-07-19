create table clinvar_stats (
CLINVAR_SET varchar(45), 
PHENOTYPE float, 
OMIM_CODE float, 
MEDGEN_CODE float, 
GENALLIANCE_CODE float, 
SNOMED_CODE float, 
GENEREV_CODE float, 
ORPHNET_CODE float, 
ORD_CODE float, 
MESH_CODE float, 
HPO_CODE float, 
GHR_CODE float, 
GENETEST_CODE float, 
GENE_CODE float, 
UNISWISSPROT_CODE float, 
EFO_CODE float, 
ICD9_CODE float, 
GENE float, 
DBSNP_DB float, 
DBVAR_DB float, 
OMIM_DB float, 
GENEREV_DB float, 
UNISWISSPROT_DB float, 
DBRBC_DB float, 
NCBI_DB float, 
GENE_DB float, 
VAR_TYPE float, 
INTERPRETATION float, 
STAR_NUM float, 
HGVS_CODING float, 
HGVS_GENOMIC float, 
HGVS_PROTEIN float, 
ASSEMBLY float, 
CHR float, 
ACCESSION float, 
START_SEQ float, 
STOP_SEQ float);

set @PHENOTYPE=(select((select count(PHENOTYPE) from clinvar_db.clinvar_data where PHENOTYPE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @OMIM_CODE=(select((select count(OMIM_CODE) from clinvar_db.clinvar_data where OMIM_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @MEDGEN_CODE=(select((select count(MEDGEN_CODE) from clinvar_db.clinvar_data where MEDGEN_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @GENALLIANCE_CODE=(select((select count(GENALLIANCE_CODE) from clinvar_db.clinvar_data where GENALLIANCE_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @SNOMED_CODE=(select((select count(SNOMED_CODE) from clinvar_db.clinvar_data where SNOMED_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @GENEREV_CODE=(select((select count(GENEREV_CODE) from clinvar_db.clinvar_data where GENEREV_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @ORPHNET_CODE=(select((select count(ORPHNET_CODE) from clinvar_db.clinvar_data where ORPHNET_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @ORD_CODE=(select((select count(ORD_CODE) from clinvar_db.clinvar_data where ORD_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @MESH_CODE=(select((select count(MESH_CODE) from clinvar_db.clinvar_data where MESH_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @HPO_CODE=(select((select count(HPO_CODE) from clinvar_db.clinvar_data where HPO_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @GHR_CODE=(select((select count(GHR_CODE) from clinvar_db.clinvar_data where GHR_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @GENETEST_CODE=(select((select count(GENETEST_CODE) from clinvar_db.clinvar_data where GENETEST_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @GENE_CODE=(select((select count(GENE_CODE) from clinvar_db.clinvar_data where GENE_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @UNISWISSPROT_CODE=(select((select count(UNISWISSPROT_CODE) from clinvar_db.clinvar_data where UNISWISSPROT_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @EFO_CODE=(select((select count(EFO_CODE) from clinvar_db.clinvar_data where EFO_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @ICD9_CODE=(select((select count(ICD9_CODE) from clinvar_db.clinvar_data where ICD9_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @GENE=(select((select count(GENE) from clinvar_db.clinvar_data where GENE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @DBSNP_DB=(select((select count(DBSNP_DB) from clinvar_db.clinvar_data where DBSNP_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @DBVAR_DB=(select((select count(DBVAR_DB) from clinvar_db.clinvar_data where DBVAR_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @OMIM_DB=(select((select count(OMIM_DB) from clinvar_db.clinvar_data where OMIM_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @GENEREV_DB=(select((select count(GENEREV_DB) from clinvar_db.clinvar_data where GENEREV_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @UNISWISSPROT_DB=(select((select count(UNISWISSPROT_DB) from clinvar_db.clinvar_data where UNISWISSPROT_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @DBRBC_DB=(select((select count(DBRBC_DB) from clinvar_db.clinvar_data where DBRBC_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @NCBI_DB=(select((select count(NCBI_DB) from clinvar_db.clinvar_data where NCBI_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @GENE_DB=(select((select count(GENE_DB) from clinvar_db.clinvar_data where GENE_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @VAR_TYPE=(select((select count(VAR_TYPE) from clinvar_db.clinvar_data where VAR_TYPE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @INTERPRETATION=(select((select count(INTERPRETATION) from clinvar_db.clinvar_data where INTERPRETATION!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @STAR_NUM=(select((select count(STAR_NUM) from clinvar_db.clinvar_data where STAR_NUM!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @HGVS_CODING=(select((select count(HGVS_CODING) from clinvar_db.clinvar_data where HGVS_CODING!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @HGVS_GENOMIC=(select((select count(HGVS_GENOMIC) from clinvar_db.clinvar_data where HGVS_GENOMIC!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @HGVS_PROTEIN=(select((select count(HGVS_PROTEIN) from clinvar_db.clinvar_data where HGVS_PROTEIN!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @ASSEMBLY=(select((select count(ASSEMBLY) from clinvar_db.clinvar_data where ASSEMBLY!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @CHR=(select((select count(CHR) from clinvar_db.clinvar_data where CHR!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @ACCESSION=(select((select count(ACCESSION) from clinvar_db.clinvar_data where ACCESSION!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @START_SEQ=(select((select count(START_SEQ) from clinvar_db.clinvar_data where START_SEQ!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/
set @STOP_SEQ=(select((select count(STOP_SEQ) from clinvar_db.clinvar_data where STOP_SEQ!='')/(select count(RCV) from clinvar_db.clinvar_data))*100); /*genes*/


insert into clinvar_stats values ('jun14', @PHENOTYPE, @OMIM_CODE, @MEDGEN_CODE, @GENALLIANCE_CODE, @SNOMED_CODE, @GENEREV_CODE, @ORPHNET_CODE, 
@ORD_CODE, @MESH_CODE, @HPO_CODE, @GHR_CODE, @GENETEST_CODE, @GENE_CODE, @UNISWISSPROT_CODE, @EFO_CODE, @ICD9_CODE, @GENE, @DBSNP_DB, @DBVAR_DB, 
@OMIM_DB, @GENEREV_DB, @UNISWISSPROT_DB, @DBRBC_DB, @NCBI_DB, @GENE_DB, @VAR_TYPE, @INTERPRETATION, @STAR_NUM, @HGVS_CODING, @HGVS_GENOMIC, 
@HGVS_PROTEIN, @ASSEMBLY, @CHR, @ACCESSION, @START_SEQ, @STOP_SEQ);

select * from clinvar_stats;