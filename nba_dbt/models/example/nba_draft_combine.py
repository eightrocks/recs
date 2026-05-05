import pandas as pd
from nba_api.stats.endpoints import draftcombinestats

def nba_draft_combine():
    # Fetch draft combine stats for 2024-25 season
    data = draftcombinestats.DraftCombineStats(league_id='00', season_all_time="2024-25")
    pd_data = data.draft_combine_stats.get_data_frame()

    # Clean data: remove columns with >50% missing values
    missing = pd_data.isnull().sum()
    missing_pct = (pd_data.isnull().sum() / len(pd_data)) * 100
    cols_to_keep = missing_pct[missing_pct < 50].index.tolist()
    pd_data_clean = pd_data[cols_to_keep]

    # Select final columns based on exploration
    cols_to_keep_final = [
        'PLAYER_ID', 'LANE_AGILITY_TIME', 'MAX_VERTICAL_LEAP', 'STANDING_VERTICAL_LEAP',
        'THREE_QUARTER_SPRINT', 'STANDING_REACH_FT_IN', 'WINGSPAN_FT_IN',
        'WEIGHT', 'POSITION', 'FIRST_NAME', 'LAST_NAME', 'SEASON',
        'HEIGHT_WO_SHOES_FT_IN', 'HAND_WIDTH', 'HAND_LENGTH'
    ]

    # Keep only columns that exist in the cleaned data
    existing_cols = [col for col in cols_to_keep_final if col in pd_data_clean.columns]
    pd_data_final = pd_data_clean[existing_cols]

    return pd_data_final
    