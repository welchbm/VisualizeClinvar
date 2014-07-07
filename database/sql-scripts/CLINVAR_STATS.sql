
select * from clinvar_db.clinvar_data; /*pull up all values in database */
select * from clinvar_db.clinvar_data where GENE="BRCA1"; /* pull all values of a particular field and value */

/* number of clinvar entries*/
select count(idclinvar_data) from clinvar_db.clinvar_data; 

/*percentages of values in clinvar*/
select ((select count(GENE) from clinvar_db.clinvar_data where GENE!='')/(select count(idclinvar_data) from clinvar_db.clinvar_data))*100; /*genes*/
select ((select count(HGVS_CODING) from clinvar_db.clinvar_data where HGVS_CODING!='')/(select count(idclinvar_data) from clinvar_db.clinvar_data))*100; /* */
select ((select count(HGVS_GENOMIC) from clinvar_db.clinvar_data where HGVS_GENOMIC!='')/(select count(idclinvar_data) from clinvar_db.clinvar_data))*100; /* */
select ((select count(HGVS_PROTEIN) from clinvar_db.clinvar_data where HGVS_PROTEIN!='')/(select count(idclinvar_data) from clinvar_db.clinvar_data))*100; /* */
select ((select count(START_SEQ) from clinvar_db.clinvar_data where START_SEQ!='')/(select count(idclinvar_data) from clinvar_db.clinvar_data))*100; /* */
select ((select count(STOP_SEQ) from clinvar_db.clinvar_data where STOP_SEQ!='')/(select count(idclinvar_data) from clinvar_db.clinvar_data))*100; /* */
select ((select count(CHR) from clinvar_db.clinvar_data where CHR!='')/(select count(idclinvar_data) from clinvar_db.clinvar_data))*100; /* */
select ((select count(PHENOTYPE) from clinvar_db.clinvar_data where PHENOTYPE!='')/(select count(idclinvar_data) from clinvar_db.clinvar_data))*100; 
select ((select count(SNOMED_CODE) from clinvar_db.clinvar_data where SNOMED_CODE!='')/(select count(idclinvar_data) from clinvar_db.clinvar_data))*100; 

/*Select all entries with missing values of a particular field*/
select * from clinvar_db.clinvar_data where CHR="";
select * from clinvar_db.clinvar_data where GENE="";

/*Count number of distinct values in a particulr field*/
select count(distinct PHENOTYPE) FROM clinvar_db.clinvar_data;
select count(distinct SNOMED_CODE) FROM clinvar_db.clinvar_data;
select count(distinct CLINVARSET_ID) FROM clinvar_db.clinvar_data;
select count(distinct INTERPRETATION) FROM clinvar_db.clinvar_data;


