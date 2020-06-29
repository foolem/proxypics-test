# == Schema Information
#
# Table name: photos
#
#  id           :bigint           not null, primary key
#  resource_url :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  order_id     :bigint           not null
#
# Indexes
#
#  index_photos_on_order_id  (order_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#
require 'rails_helper'

RSpec.describe Photo, type: :model do
  
  describe 'associations' do
    it { should belong_to(:order) }
  end

  describe 'callbacks' do
    context "after_create" do
      it "sets order's state to 'completed'" do 
        order = create(:order)
        photo = create(:photo, order: order)
        expect(photo.order.state).to eq("completed")
      end
    end
  end

end
