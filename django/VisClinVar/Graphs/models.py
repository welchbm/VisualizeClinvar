from django.db import models

class Dspclinva(models.Model):
    clinvarset_id = models.IntegerField(db_column='CLINVARSET_ID') # Field name made lowercase.
    gene = models.CharField(db_column='GENE', max_length=20) # Field name made lowercase.
    date_created = models.DateField(db_column='DATE_CREATED') # Field name made lowercase.
    date_updated = models.DateField(db_column='DATE_UPDATED') # Field name made lowercase.
    phenotype = models.TextField(db_column='PHENOTYPE', blank=True) # Field name made lowercase.
    var_type = models.CharField(db_column='VAR_TYPE', max_length=30) # Field name made lowercase.
    interpretaton_starnum = models.CharField(db_column='INTERPRETATON_STARNUM', max_length=30) # Field name made lowercase.
    interpretaton_significance = models.CharField(db_column='INTERPRETATON_SIGNIFICANCE', max_length=30) # Field name made lowercase.
    batchid = models.DateField(db_column='BATCHID') # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'dspclinva'
