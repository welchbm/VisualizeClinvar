
select * from clinvar_db.clinvar_data; /*pull up all values in database */
select * from clinvar_db.clinvar_data where GENE="BRCA1"; /* pull all values of a particular field and value */
select SNOMED_CODE from clinvar_db.clinvar_data where CLINVARSET_ID="2365622";

/* number of clinvar entries*/
select count(idclinvar_data) from clinvar_db.clinvar_data; 

/*percentages of values in clinvar*/
select ((select count(PHENOTYPE) from clinvar_db.clinvar_data where PHENOTYPE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; 
select ((select count(SNOMED_CODE) from clinvar_db.clinvar_data where SNOMED_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; 
select ((select count(HPO_CODE) from clinvar_db.clinvar_data where HPO_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; 
select ((select count(MEDGEN_CODE) from clinvar_db.clinvar_data where MEDGEN_CODE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; 
select ((select count(GENE) from clinvar_db.clinvar_data where GENE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /*genes*/
select ((select count(DBVAR_DB) from clinvar_db.clinvar_data where DBVAR_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /*genes*/
select ((select count(DBSNP_DB) from clinvar_db.clinvar_data where DBSNP_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /*genes*/
select ((select count(OMIM_DB) from clinvar_db.clinvar_data where OMIM_DB!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /*genes*/
select ((select count(VAR_TYPE) from clinvar_db.clinvar_data where VAR_TYPE!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /*genes*/
select ((select count(INTERPRETATION) from clinvar_db.clinvar_data where INTERPRETATION!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /*genes*/
select ((select count(HGVS_CODING) from clinvar_db.clinvar_data where HGVS_CODING!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /* */
select ((select count(HGVS_GENOMIC) from clinvar_db.clinvar_data where HGVS_GENOMIC!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /* */
select ((select count(HGVS_PROTEIN) from clinvar_db.clinvar_data where HGVS_PROTEIN!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /* */
select ((select count(START_SEQ) from clinvar_db.clinvar_data where START_SEQ!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /* */
select ((select count(STOP_SEQ) from clinvar_db.clinvar_data where STOP_SEQ!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /* */
select ((select count(CHR) from clinvar_db.clinvar_data where CHR!='')/(select count(RCV) from clinvar_db.clinvar_data))*100; /* */

select ((select count(STAR_NUM) from clinvar_db.clinvar_data where STAR_NUM='classified by multiple submitters')/(select count(idclinvar_data) from clinvar_db.clinvar_data))*100; /* */

/*Select all entries with missing values of a particular field*/
select * from clinvar_db.clinvar_data where CHR="";
select * from clinvar_db.clinvar_data where GENE="";

/*Count number of distinct values in a particulr field*/
select count(distinct PHENOTYPE) FROM clinvar_db.clinvar_data;
select count(distinct SNOMED_CODE) FROM clinvar_db.clinvar_data;
select count(distinct CLINVARSET_ID) FROM clinvar_db.clinvar_data;
select count(distinct INTERPRETATION) FROM clinvar_db.clinvar_data;



/*show distinct values in db*/
select distinct STAR_NUM from clinvar_db.clinvar_data;


truncate table clinvar_data;

ALTER TABLE clinvar_data MODIFY STAR_NUM varchar(100) AFTER INTERPRETATION;
ALTER TABLE clinvar_data ADD OMIM_DB varchar(100) AFTER DBSNP_DB;
alter table clinvar_data MODIFY DATE_LAST_UPDATED VARCHAR(100);
