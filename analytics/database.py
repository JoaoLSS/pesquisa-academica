import os
from sqlalchemy import create_engine
from dotenv import load_dotenv
import decimal, datetime
import json

load_dotenv()

engine = create_engine(os.environ.get('DATABASE_URL'))

def alchemyencoder(obj):
    """JSON encoder function for SQLAlchemy special classes."""
    if isinstance(obj, datetime.date):
        return obj.isoformat()
    elif isinstance(obj, decimal.Decimal):
        return float(obj)

def toJson(result):
    return json.dumps([dict(r) for r in result], default=alchemyencoder)