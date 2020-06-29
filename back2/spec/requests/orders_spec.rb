require 'rails_helper'

RSpec.describe "/orders", type: :request do

  describe "GET /index" do
    let (:meta) {{
      state: 'pending'
    }}

    before do 
      create_list(:order, 3)
    end

    it "returns a 200 code" do
      get orders_url, { params: { meta: meta } }
      expect(response.status).to eq(200)
    end

    it "returns 3 orders" do
      get orders_url, { params: { meta: meta } }
      expect(JSON.parse(response.body).count).to eq(3)
    end
  end

  describe "GET /show" do

    let(:order) { create(:order) }

    it "returns a 200 code" do
      get order_url(order)
      expect(response).to have_http_status(:ok)
    end

    it "returns a order with same id" do
      get order_url(order)
      expect(JSON.parse(response.body)['id']).to eq(order.id)
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      let(:valid_attributes) {{
        address: "767, 5th Ave, New York, NY",
        latitude: 40.7636433,
        longitude: -73.9748858,
      }}

      it "creates a new Order" do
        expect {
          post orders_url,
               params: { order: valid_attributes }
        }.to change(Order, :count).by(1)
      end

      it "returns a 201 code" do
        post orders_url,
             params: { order: valid_attributes }
        expect(response).to have_http_status(:created)
      end

      it "returns a JSON response with the new order" do
        post orders_url,
             params: { order: valid_attributes }
        expect(JSON.parse(response.body)).to be_truthy
      end
    end

    context "with invalid parameters" do
      let(:invalid_attributes) {{
        address: "5th Ave"
      }}

      it "does not create a new Order" do
        expect {
          post orders_url,
               params: { order: invalid_attributes }
        }.to change(Order, :count).by(0)
      end

      it "returns a 422 code" do
        post orders_url,
             params: { order: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns a JSON response with errors for the new order" do
        post orders_url,
             params: { order: invalid_attributes }

        expect(JSON.parse(response.body)).to eq({
          "latitude"=>["can't be blank"],
          "longitude"=>["can't be blank"]
        })
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_valid_attributes) {{
        address: "102"
      }}

      it "updates the requested order" do
        order = create(:order)
        patch order_url(order),
              params: { order: new_valid_attributes }
        
        expect(order.reload.address).to eq(new_valid_attributes[:address])
      end

      it "returns a 200 code" do
        order = create(:order)
        patch order_url(order),
              params: { order: new_valid_attributes }
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do
      let(:new_invalid_attributes) {{
        address: ""
      }}

      it "returns a 422 code" do
        order = create(:order)
        patch order_url(order),
              params: { order: new_invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns a JSON response with errors for the order" do
        order = create(:order)
        patch order_url(order),
              params: { order: new_invalid_attributes }
        
        expect(JSON.parse(response.body)).to eq({"address"=>["can't be blank"]})
      end
    end
  end

  describe "DELETE /destroy" do
    context "with valid parameters" do 
      it "destroys the requested order" do
        order = create(:order)
        expect {
          delete order_url(order)
        }.to change(Order, :count).by(-1)
      end

      it "returns a 200 code" do
        order = create(:order)
        delete order_url(order)

        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do 
      it "does not destroy the requested order" do
        expect {
          delete order_url(999)
        }.to change(Order, :count).by(0)
      end

      it "returns a 404 code" do
        delete order_url(999)

        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
