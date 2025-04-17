from fastapi import FastAPI
from app.api import router


app = FastAPI(
    title="stutter enhancer",
    summary="Stutter enhancer API helps you get fluent voice notes. 🚀",
    version="0.0.1",
)

# add routers
app.include_router(router.router)


#  uvicorn main:app --reload #externally
if __name__ =="__main__":
    import uvicorn
    uvicorn.run("main:app", reload=True)