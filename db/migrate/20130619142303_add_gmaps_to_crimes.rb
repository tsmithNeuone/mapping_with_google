class AddGmapsToCrimes < ActiveRecord::Migration
  def change
    add_column :crimes, :gmaps, :boolean
  end
end
