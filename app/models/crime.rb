class Crime < ActiveRecord::Base
  attr_accessible :city, :date_of_crime, :latitude, :longitude, :state, :street_address, :title, :type_of_crime, :zipcode
  
  acts_as_gmappable
  
  def gmaps4rails_address
    "#{street_address}, #{city}, #{state}, #{zipcode}"    
  end
end
