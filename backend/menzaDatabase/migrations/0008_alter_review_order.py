# Generated by Django 4.1.5 on 2023-02-14 16:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('menzaDatabase', '0007_alter_review_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='order',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='menzaDatabase.order'),
        ),
    ]