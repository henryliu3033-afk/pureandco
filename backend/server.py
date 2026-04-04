from fastapi import Body, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from starlette.middleware.sessions import SessionMiddleware
import json
from pydantic import BaseModel


class Member(BaseModel):
    username: str
    email: str
    password: str
    phone: str
    create_at: str
class loginbody(BaseModel):
    email: str
    password: str


app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="your-secret-key")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
    
    allow_credentials=True
)
con = mysql.connector.connect(
    host="localhost",
    user="root",
    password="H!nry331237661",
    database="PUREANDCO"
)

@app.post("/member")
def create_member(body:Member):
    username = body.username
    email = body.email
    password = body.password
    phone = body.phone
    create_at = body.create_at

    cursor = con.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", [email])
    existing_member = cursor.fetchone()
    if existing_member:
        return {"message": "已經註冊過了"}
    else:
        cursor.execute("INSERT INTO users(username,email,password,phone,create_at) VALUES(%s,%s,%s,%s,%s)",
                       [username, email, password, phone, create_at])
        con.commit()
        return {"message": "Member created successfully"}
    
@app.put("/member/login")
def login(body:loginbody, request: Request):
    email = body.email
    password = body.password

    cursor = con.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", [email, password])
    member = cursor.fetchone()
    if member:
        member["create_at"] = str(member["create_at"])
        request.session["member"] = member
        return {"message": "登入成功"}
    else:
        return {"message": "登入失敗"}
    
@app.get("/member/auth")
def auth(request: Request):
    member = request.session.get("member")
    if request.session.get("member") is not None:
        member = request.session["member"]
        return {"message": "已經登入", "ok": True, "member": member["username"], "email": member["email"]}
    else:
        return {"message": "未登入", "ok": False}
    

