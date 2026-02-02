-- Returns distance in KM for a single freelancer
CREATE OR REPLACE FUNCTION get_freelancer_distance_km(
  in_latitude DOUBLE PRECISION,
  in_longitude DOUBLE PRECISION,
  in_freelancer_id TEXT
)
RETURNS DOUBLE PRECISION
LANGUAGE sql
AS $$
  SELECT
    6371 * acos(
      cos(radians(in_latitude))
      * cos(radians(fl.latitude))
      * cos(radians(fl.longitude) - radians(in_longitude))
      + sin(radians(in_latitude))
      * sin(radians(fl.latitude))
    )
  FROM "FreelancerLocation" fl
  WHERE
    fl."freelancerId" = in_freelancer_id
  ORDER BY fl."recordedAt" DESC
  LIMIT 1;
$$;
