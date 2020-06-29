require "rails_helper"

RSpec.describe PhotosController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/orders/1/photos").to route_to("photos#index", order_id: "1")
    end

    it "routes to #show" do
      expect(get: "/orders/1/photos/1").to route_to("photos#show", order_id: "1", id: "1")
    end


    it "routes to #create" do
      expect(post: "/orders/1/photos").to route_to("photos#create", order_id: "1")
    end

    it "routes to #update via PUT" do
      expect(put: "/orders/1/photos/1").to route_to("photos#update", order_id: "1", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/orders/1/photos/1").to route_to("photos#update", order_id: "1", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/orders/1/photos/1").to route_to("photos#destroy", order_id: "1", id: "1")
    end
  end
end
