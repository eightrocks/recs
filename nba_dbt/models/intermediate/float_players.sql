{{ config(materialized='view') }}

with src as (
    select *
    from {{ ref('stg_players') }}
),

typed as (
    select
        player_id,
        season,
        player_name,
        position,

        lane_agility_time,
        max_vertical_leap,
        standing_vertical_leap,
        three_quarter_sprint,
        hand_width,
        hand_length,

        nullif(weight, '')::float8 as weight,

        (
            nullif(split_part(regexp_replace(height_wo_shoes_ft_in, '\s+', '', 'g'), '''', 1), '')::float8 * 12.0
            + nullif(split_part(regexp_replace(height_wo_shoes_ft_in, '\s+', '', 'g'), '''', 2), '')::float8
        )::float8 as height_wo_shoes_ft_in,

        (
            nullif(split_part(regexp_replace(standing_reach_ft_in, '\s+', '', 'g'), '''', 1), '')::float8 * 12.0
            + nullif(split_part(regexp_replace(standing_reach_ft_in, '\s+', '', 'g'), '''', 2), '')::float8
        )::float8 as standing_reach_ft_in,

        (
            nullif(split_part(regexp_replace(wingspan_ft_in, '\s+', '', 'g'), '''', 1), '')::float8 * 12.0
            + nullif(split_part(regexp_replace(wingspan_ft_in, '\s+', '', 'g'), '''', 2), '')::float8
        )::float8 as wingspan_ft_in
    from src
)

select *
from typed

