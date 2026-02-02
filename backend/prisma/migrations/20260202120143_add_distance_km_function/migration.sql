-- Returns distance in KM
CREATE OR REPLACE FUNCTION get_distance_km(
  user_lat DOUBLE PRECISION,
  user_lng DOUBLE PRECISION,
  freelancer_lat DOUBLE PRECISION,
  freelancer_lng DOUBLE PRECISION
)
RETURNS DOUBLE PRECISION
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT
    6371 * acos(
      LEAST(1, GREATEST(-1,
        cos(radians(user_lat))
        * cos(radians(freelancer_lat))
        * cos(radians(freelancer_lng) - radians(user_lng))
        + sin(radians(user_lat))
        * sin(radians(freelancer_lat))
      ))
    );
$$;



