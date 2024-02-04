import logging
import os
from dotenv import load_dotenv

logger = logging.getLogger()

load_dotenv()


class Config(object):
    AUTH0_AUDIENCE = os.environ.get('AUTH0_AUDIENCE')
    AUTH0_DOMAIN = os.environ.get('AUTH0_DOMAIN')
    CLIENT_ORIGIN_URL = os.environ.get('CLIENT_ORIGIN_URL') or 'http://localhost:4200'
    PORT = os.environ.get('PORT') or 8000

    SQLALCHEMY_DATABASE_URL = os.environ.get('SQLALCHEMY_DATABASE_URL') or "sqlite:///./sql_app.db"
