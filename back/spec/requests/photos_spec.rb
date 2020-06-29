require 'rails_helper'

RSpec.describe "/orders/:order_id/photos", type: :request do

  let!(:order) { create(:order) }

  describe "GET /index" do
    before do 
      create_list(:photo, 3, order: order)
    end

    it "returns a 200 code" do
      get order_photos_url(order)
      expect(response.status).to eq(200)
    end

    it "returns 3 photos" do
      get order_photos_url(order)
      expect(JSON.parse(response.body).count).to eq(3)
    end
  end

  describe "GET /show" do

    let(:photo) { create(:photo) }

    it "returns a 200 code" do
      get order_photo_url(order, photo)
      expect(response).to have_http_status(:ok)
    end

    it "returns a photo with same id" do
      get order_photo_url(order, photo)
      expect(JSON.parse(response.body)['id']).to eq(photo.id)
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      let (:valid_attributes) {{
        order_id: create(:order).id,
        resource_url: "https://..."
      }}

      it "creates a new photo" do
        expect {
          post order_photos_url(order.id),
               params: { photo: valid_attributes }
        }.to change(Photo, :count).by(1)
      end

      it "returns a 201 code" do
        post order_photos_url(order.id),
             params: { photo: valid_attributes }
        expect(response).to have_http_status(:created)
      end

      it "returns a JSON response with the new photo" do
        post order_photos_url(order.id),
             params: { photo: valid_attributes }
        expect(JSON.parse(response.body)).to be_truthy
      end
    end

    context "with invalid parameters" do
      let(:invalid_attributes) {{
        resource_url: ""
      }}

      it "does not create a new photo" do
        expect {
          post order_photos_url(order.id),
               params: { photo: invalid_attributes }
        }.to change(Photo, :count).by(0)
      end

      it "returns a 422 code" do
        post order_photos_url(order.id),
             params: { photo: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns a JSON response with errors for the new photo" do
        post order_photos_url(order.id),
             params: { photo: invalid_attributes }

        expect(JSON.parse(response.body)).to eq({
          "order"=>["must exist"], 
          "order_id"=>["can't be blank"], 
          "resource_url"=>["can't be blank"]
        })
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_valid_attributes) {{
        resource_url: "https://..."
      }}

      it "updates the requested photo" do
        photo = create(:photo)
        patch order_photo_url(order, photo),
              params: { photo: new_valid_attributes }
        
        expect(photo.reload.resource_url).to eq(new_valid_attributes[:resource_url])
      end

      it "returns a 200 code" do
        photo = create(:photo)
        patch order_photo_url(order, photo),
              params: { photo: new_valid_attributes }
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do
      let(:new_invalid_attributes) {{
        resource_url: ""
      }}

      it "returns a 422 code" do
        photo = create(:photo)
        patch order_photo_url(order, photo),
              params: { photo: new_invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns a JSON response with errors for the photo" do
        photo = create(:photo)
        patch order_photo_url(order, photo),
              params: { photo: new_invalid_attributes }
        
        expect(JSON.parse(response.body)).to eq({"resource_url"=>["can't be blank"]})
      end
    end
  end

  describe "DELETE /destroy" do
    context "with valid parameters" do 
      it "destroys the requested photo" do
        photo = create(:photo)
        expect {
          delete order_photo_url(order, photo)
        }.to change(Photo, :count).by(-1)
      end

      it "returns a 200 code" do
        photo = create(:photo)
        delete order_photo_url(order, photo)

        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do 
      it "does not destroy the requested photo" do
        expect {
          delete order_photo_url(order, 999)
        }.to change(Photo, :count).by(0)
      end

      it "returns a 404 code" do
        delete order_photo_url(order, 999)

        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
