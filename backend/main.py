from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic.main import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status", status_code=status.HTTP_404_NOT_FOUND)
def root():
    return {"message": "backend is running"}
    
class calculateRequest(BaseModel):
    num1 : int
    num2 : int

@app.post("/calculator", status_code=status.HTTP_200_OK)
def cal(payload : calculateRequest):
    result = payload.num1 + payload.num2
    return {"result": result}
      