from celery import Celery
from dotenv import load_dotenv
import os


load_dotenv("./deployment/.env")
url = os.getenv("REDISURL")

celery_app = Celery(
    'tasks',
    broker=f'redis://{url}/0',
    backend=f'redis://{url}/1'
)
celery_app.autodiscover_tasks(["app.tasks.celery_tasks"])

celery_app.conf.update(task_track_started=True)
celery_app.conf.update(
    task_concurrency=4,  # each worker uses 4 threads to handle 4 tasks
    worker_prefetch_multiplier=1,  # Prefetching is the process of loading a batch of tasks into a worker’s memory before they are actually executed. ideally load the same number of threads a worker can have ;)
    worker_heartbeat=120, #Workers send periodic heartbeat messages to the broker to let it know that they are still running. (every 120 s)
)

# Route ai tasks to the 'aiqueue' queue
celery_app.conf.task_routes = {
    'speech_to_text': {'queue': 'aiqueue'},
    'text_to_speech': {'queue': 'aiqueue'},
}