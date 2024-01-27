import secure
from .config import Config
from .dependencies import PermissionsValidator, validate_token
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.orm import Session

from . import models
from .database import engine

from .routers import rows, sheets


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

csp = secure.ContentSecurityPolicy().default_src("'self'").frame_ancestors("'none'")
hsts = secure.StrictTransportSecurity().max_age(31536000).include_subdomains()
referrer = secure.ReferrerPolicy().no_referrer()
cache_value = secure.CacheControl().no_cache().no_store().max_age(0).must_revalidate()
x_frame_options = secure.XFrameOptions().deny()

# secure_headers = secure.Secure(
#     csp=csp,
#     hsts=hsts,
#     referrer=referrer,
#     cache=cache_value,
#     xfo=x_frame_options,
# )

# @app.middleware("http")
# async def set_secure_headers(request, call_next):
#     response = await call_next(request)
#     secure_headers.framework.fastapi(response)
#     return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=[Config.CLIENT_ORIGIN_URL],
    allow_methods=["GET"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=86400,
)

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    message = str(exc.detail)

    return JSONResponse({"message": message}, status_code=exc.status_code)

app.include_router(sheets.router)
app.include_router(rows.router)







# @app.get("/api/messages/public")
# def public():
#     return {"text": "This is a public message."}


# @app.get("/api/messages/protected", dependencies=[Depends(validate_token)])
# def protected():
#     return {"text": "This is a protected message."}


# @app.get(
#     "/api/messages/admin",
#     dependencies=[Depends(PermissionsValidator(["read:admin-messages"]))],
# )
# def admin():
#     return {"text": "This is an admin message."}


# if __name__ == "__main__":
#     uvicorn.run(
#         "main:app",
#         host="0.0.0.0",
#         port=settings.port,
#         reload=settings.reload,
#         server_header=False,
#     )



# @app.post("/users/", response_model=schemas.User)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = crud.get_user_by_email(db, email=user.email)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     return crud.create_user(db=db, user=user)


# @app.get("/users/", response_model=list[schemas.User])
# def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     users = crud.get_users(db, skip=skip, limit=limit)
#     return users


# @app.get("/users/{user_id}", response_model=schemas.User)
# def read_user(user_id: int, db: Session = Depends(get_db)):
#     db_user = crud.get_user(db, user_id=user_id)
#     if db_user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return db_user