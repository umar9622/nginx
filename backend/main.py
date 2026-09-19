from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/status", status_code=status.HTTP_200_OK)
def root():
    return {"status": "ok",
            "message": "backend is running",
            "service" : "FastAPI"
    }