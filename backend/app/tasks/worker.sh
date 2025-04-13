celery -A app.tasks.celery_config worker -Q aiqueue --loglevel=info
