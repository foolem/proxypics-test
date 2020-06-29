require "rails_helper"

RSpec.describe CredentialsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/credentials").to route_to("credentials#index")
    end
  end
end
