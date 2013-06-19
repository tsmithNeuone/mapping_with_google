class ChangeTypeInCrimeToSomethingElse < ActiveRecord::Migration
  def change
    rename_column :crimes, :type, :type_of_crime
  end
end
