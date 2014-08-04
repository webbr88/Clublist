json.array!(@nightclubs) do |nightclub|
  json.extract! nightclub, :id, :name, :address, :phone_number
  json.url nightclub_url(nightclub, format: :json)
end
