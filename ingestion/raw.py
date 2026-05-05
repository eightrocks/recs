from nba_api.stats.endpoints import playercareerstats, draftcombinestats
import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

# Load environment variables from .env file in root folder
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

def fetch_data():
    data = draftcombinestats.DraftCombineStats(league_id='00', season_all_time="All Time")
    return data.draft_combine_stats.get_data_frame()

def get_engine():
    user = os.getenv('PG_USER')
    password = os.getenv('PG_PASSWORD')
    host = os.getenv('PG_HOST')
    port = os.getenv('PG_PORT')
    database = os.getenv('PG_DATABASE')
    
    connection_string = f'postgresql://{user}:{password}@{host}:{port}/{database}'
    engine = create_engine(connection_string)
    return engine


def load_data(df, table_name):
    engine = get_engine()
    df.to_sql(table_name, engine, schema='raw',if_exists='replace', index=False)
    print(f"Loaded {len(df)} rows into raw.{table_name}")


def main():
    df = fetch_data()
    load_data(df, "players")


if __name__ == "__main__":
    main()


#print(data.get_json())


