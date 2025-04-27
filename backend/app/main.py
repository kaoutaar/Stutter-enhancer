from fastapi import FastAPI
from .api import router


app = FastAPI(
    title="stutter enhancer",
    summary="Stutter enhancer API helps you get fluent voice notes. 🚀",
    version="0.0.1",
)

# add routers
app.include_router(router.router)

#  uvicorn app.main:app --reload #in WD
# uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
if __name__ =="__main__":
    import uvicorn
    uvicorn.run("app.main:app", reload=True)