json.array!(@reservations) do |reservation|
  json.extract! reservation, :id, :res_id, :nightclub_id, :table_id, :reservation_date
  json.url reservation_url(reservation, format: :json)
end
