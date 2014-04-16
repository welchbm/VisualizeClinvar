'''
Django models for VisualizeClinVar project.
'''


from django.db import models


class Dspclinva(models.Model):
    '''
    Django models for VisualizeClinVar
    '''
    clinvarset_id = models.BigIntegerField(db_column='CLINVARSET_ID', primary_key=True) # Field name made lowercase.
    gene = models.CharField(db_column='GENE', max_length=20) # Field name made lowercase.
    date_created = models.DateField(db_column='DATE_CREATED') # Field name made lowercase.
    date_updated = models.DateField(db_column='DATE_UPDATED') # Field name made lowercase.
    phenotype = models.TextField(db_column='PHENOTYPE', blank=True) # Field name made lowercase.
    var_type = models.CharField(db_column='VAR_TYPE', max_length=30) # Field name made lowercase.
    interpretation_startnum = models.CharField(db_column='INTERPRETATION_STARTNUM', max_length=30) # Field name made lowercase.
    interpretation = models.CharField(db_column='INTERPRETATION', max_length=30) # Field name made lowercase.
    batchid = models.DateField(db_column='BATCHID') # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'dspclinva'