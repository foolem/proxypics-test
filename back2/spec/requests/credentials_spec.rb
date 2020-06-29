require 'rails_helper'

RSpec.describe "/credentials", type: :request do

  describe "GET /index" do
    it "returns a 200 code" do
      get credentials_url
      expect(response.status).to eq(200)
    end

    it "returns .env credentials" do
      get credentials_url
      expect(JSON.parse(response.body)['bucket']).to eq(ENV['BUCKET'])
      expect(JSON.parse(response.body)['region']).to eq(ENV['REGION'])
      expect(JSON.parse(response.body)['access_key']).to eq(ENV['AWS_ACCESS_KEY'])
      expect(JSON.parse(response.body)['secret_key']).to eq(ENV['AWS_SECRET_KEY'])
      expect(JSON.parse(response.body)['google_maps_key']).to eq(ENV['GOOGLE_MAPS_KEY'])
    end
  end

end
