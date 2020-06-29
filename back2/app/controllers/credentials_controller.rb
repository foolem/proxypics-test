class CredentialsController < ApplicationController

  # GET /credentials
  def index
    # On a real project, this would be a private route
    # secured with a JWT token or something

    render json: {
      bucket: ENV['BUCKET'],
      region: ENV['REGION'],
      access_key: ENV['AWS_ACCESS_KEY'],
      secret_key: ENV['AWS_SECRET_KEY'],
      google_maps_key: ENV['GOOGLE_MAPS_KEY'],
    }
  end
end
