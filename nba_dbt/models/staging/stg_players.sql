{{ config(materialized='table', unique_key=['player_id', 'season']) }}

SELECT
    "PLAYER_ID" as player_id,
    "LANE_AGILITY_TIME" as lane_agility_time,
    "MAX_VERTICAL_LEAP" as max_vertical_leap,
    "STANDING_VERTICAL_LEAP" as standing_vertical_leap,
    "THREE_QUARTER_SPRINT" as three_quarter_sprint,
    "STANDING_REACH_FT_IN" as standing_reach_ft_in,
    "WINGSPAN_FT_IN" as wingspan_ft_in,
    "WEIGHT" as weight,
    "POSITION" as position,
    "PLAYER_NAME" as player_name,
    "SEASON" as season,
    "HEIGHT_WO_SHOES_FT_IN" as height_wo_shoes_ft_in,
    "HAND_WIDTH" as hand_width,
    "HAND_LENGTH" as hand_length
FROM {{ source('raw', 'players') }}
WHERE "PLAYER_ID" != -1
  AND "LANE_AGILITY_TIME" IS NOT NULL
  AND "MAX_VERTICAL_LEAP" IS NOT NULL
  AND "STANDING_VERTICAL_LEAP" IS NOT NULL
  AND "THREE_QUARTER_SPRINT" IS NOT NULL
  AND "STANDING_REACH_FT_IN" IS NOT NULL
  AND "WINGSPAN_FT_IN" IS NOT NULL
  AND "WEIGHT" IS NOT NULL
  AND "POSITION" IS NOT NULL
  AND "FIRST_NAME" IS NOT NULL
  AND "LAST_NAME" IS NOT NULL
  AND "SEASON" IS NOT NULL
  AND "HEIGHT_WO_SHOES_FT_IN" IS NOT NULL
  AND "HAND_WIDTH" IS NOT NULL
  AND "HAND_LENGTH" IS NOT NULL