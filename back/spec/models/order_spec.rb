# == Schema Information
#
# Table name: orders
#
#  id         :bigint           not null, primary key
#  address    :string           not null
#  latitude   :float            not null
#  longitude  :float            not null
#  state      :integer          default("pending"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Order, type: :model do

  describe 'associations' do
    it { should have_many(:photos) }
  end

  describe 'callbacks' do
    context "before_create" do
      it "sets state to 'pending'" do 
        order = create(:order)
        expect(order.state).to eq("pending")
      end
    end
  end

end
