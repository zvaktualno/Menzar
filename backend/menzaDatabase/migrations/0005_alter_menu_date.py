# Generated by Django 4.1.5 on 2023-01-27 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menzaDatabase', '0004_rename_date_order_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='date',
            field=models.DateField(),
        ),
    ]
