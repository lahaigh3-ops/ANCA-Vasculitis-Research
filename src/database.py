from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLAlchemy Database Connection
DATABASE_URL = "sqlite:///trial_data.db"  # Replace with your database URL
engine = create_engine(DATABASE_URL)
Base = declarative_base()

class TrialData(Base):
    __tablename__ = 'trial_data'

    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, nullable=False)
    trial_name = Column(String, nullable=False)
    dosage = Column(Float, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    results = Column(String, nullable=True)

# Create the database tables
Base.metadata.create_all(engine)

# Session creation
Session = sessionmaker(bind=engine)
def get_session():
    return Session()
