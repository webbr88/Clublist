json.array!(@tables) do |table|
  json.extract! table, :id, :nightclub_id, :min_cost
  json.url table_url(table, format: :json)
end
