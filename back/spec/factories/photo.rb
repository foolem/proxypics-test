FactoryBot.define do
  factory :photo do
    association :order
    resource_url { "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg" }
  end
end