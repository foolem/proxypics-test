class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      t.references :order, null: false, foreign_key: true
      t.string :resource_url, null: false

      t.timestamps
    end
  end
end
