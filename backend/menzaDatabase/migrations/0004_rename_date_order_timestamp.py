# Generated by Django 4.1.5 on 2023-01-27 20:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menzaDatabase', '0003_diner_display_name_alter_order_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='date',
            new_name='timestamp',
        ),
    ]
