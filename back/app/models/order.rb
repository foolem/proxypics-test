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
class Order < ApplicationRecord
  has_many :photos, dependent: :destroy
  enum state: [ :pending, :completed ]

  validates :address, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true

  before_create :set_pending_state

  private

  def set_pending_state
    self.state = "pending"
  end
  
end
