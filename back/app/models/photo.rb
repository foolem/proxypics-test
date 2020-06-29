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
class Photo < ApplicationRecord
  belongs_to :order

  validates :resource_url, presence: true
  validates :order_id, presence: true

  after_create :set_order_state

  private

  def set_order_state
    order.update(state: "completed") if order.state != "completed"
  end
end
