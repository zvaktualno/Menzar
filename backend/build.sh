#!/usr/bin/env bash
# exit on error
set -o errexit

pip install poetry -U
poetry install

python manage.py collectstatic --no-input
python manage.py migrate

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('nevemcejetupametnaideja', 'admin@myproject.com', 'butwedoinitanyway')" | python manage.py shell