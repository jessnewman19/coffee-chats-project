require 'faker'
Industry.delete_all 
Professional.delete_all

puts "💻 Seeding industries..."

Industry.create([
    {industry: "Data Science"},
    {industry: "Software Development"},
    {industry: "App Development"},
    {industry: "Cybersecurity"},
    {industry: "Product Management"},
    {industry: "Design"},
])

# puts "👩🏼‍💻 Seeding professionals..."

# 40.times do 
#     Professional.create(
#         full_name: Faker::Name.name,
#         linkedin: Faker::Internet.url(host: 'linkedin.com'),
#         image_url: Faker::LoremFlickr.colorized_image, 
#         bio: Faker::Lorem.paragraph(sentence_count: 5), 
#         industry_id: Faker::Number.between(from: 1, to: 8),
#     )
# end