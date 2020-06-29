puts "Creating 10 orders with pending state\n"

10.times do 
  Order.create!(
    address: "#{Faker::Address.building_number} #{Faker::Address.street_name}, #{Faker::Address.city}, #{Faker::Address.state}",
    latitude: Faker::Address.latitude,
    longitude: Faker::Address.longitude,
  )
  print "."
end

# Creates at least 3 photos for the last 4 orders,
# these 4 orders will have a completed state

puts "\nCreating at least 3 photos for the last 4 orders"

photos = [
  'https://www.teclasap.com.br/wp-content/uploads/2009/09/house-1.jpg',
  'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-s/18/06/27/98/the-up-house.jpg',
  'https://c8.alamy.com/comp/T9TAFN/traditional-japanese-house-at-oshino-hakkai-village-fuji-five-lake-region-japan-T9TAFN.jpg',
  'https://i.pinimg.com/originals/6b/0f/7e/6b0f7e90e7c4ca4ed00507f80801d67e.jpg',
  'https://image.shutterstock.com/image-photo/traditional-japanese-house-nara-japan-600w-28470103.jpg'
]

Order.last(4).each do |order|
  quantity = rand(3..6)
  quantity.times do 
    Photo.create!(order: order, resource_url: photos[rand(0..5)])
    print "."
  end
end