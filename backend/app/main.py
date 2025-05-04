from fastapi import FastAPI
from .api import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="stutter enhancer",
    summary="Stutter enhancer API helps you get fluent voice notes. 🚀",
    version="0.0.1",
)

# add routers
app.include_router(router.router)

origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#  uvicorn app.main:app --reload #in WD
# uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
if __name__ =="__main__":
    import uvicorn
    uvicorn.run("app.main:app", reload=True)