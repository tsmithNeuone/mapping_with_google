class CreateCrimes < ActiveRecord::Migration
  def change
    create_table :crimes do |t|
      t.string :title
      t.string :type
      t.date :date_of_crime
      t.float :latitude
      t.float :longitude
      t.string :street_address
      t.string :city
      t.string :state
      t.string :zipcode

      t.timestamps
    end
  end
end
