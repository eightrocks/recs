from nba_api.stats.endpoints import playercareerstats, draftcombinestats
import pandas as pd


data  = draftcombinestats.DraftCombineStats(league_id='00',season_all_time="2024-25")

pd_data = data.draft_combine_stats.get_data_frame()
print(pd_data.head())

#print(data.get_json())


