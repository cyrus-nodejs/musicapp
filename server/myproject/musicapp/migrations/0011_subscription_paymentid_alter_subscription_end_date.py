# Generated by Django 5.1.6 on 2025-03-20 02:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicapp', '0010_remove_order_plans_order_plans'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscription',
            name='paymentid',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='subscription',
            name='end_date',
            field=models.DateTimeField(null=True),
        ),
    ]
