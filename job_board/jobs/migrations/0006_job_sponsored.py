# Generated by Django 4.2.6 on 2023-11-06 14:18

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("jobs", "0005_sponsoredjobpost"),
    ]

    operations = [
        migrations.AddField(
            model_name="job",
            name="sponsored",
            field=models.BooleanField(default=False),
        ),
    ]
