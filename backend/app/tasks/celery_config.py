from celery import Celery



# redis://[username:password@]host:port/db_num
celery_app = Celery(
    'tasks',
    broker='redis://redis:6379/0',
    backend='redis://redis:6379/1'
)

celery_app.conf.update(
    task_concurrency=4,  # each worker uses 4 threads to handle 4 tasks
    worker_prefetch_multiplier=1,  # Prefetching is the process of loading a batch of tasks into a worker’s memory before they are actually executed. ideally load the same number of threads a worker can have ;)
    worker_heartbeat=120, #Workers send periodic heartbeat messages to the broker to let it know that they are still running. (every 120 s)
)

# Route ai tasks to the 'aiqueue' queue
celery_app.conf.task_routes = {
    'app.tasks.speech_to_text': {'queue': 'aiqueue'},
    'app.tasks.text_to_speech': {'queue': 'aiqueue'},
}