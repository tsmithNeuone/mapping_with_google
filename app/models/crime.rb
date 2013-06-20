class Crime < ActiveRecord::Base
  
  attr_accessible :city, :date_of_crime, :latitude, :longitude, :state, :street_address, :title, :type_of_crime, :zipcode
  
  acts_as_gmappable
  
  def gmaps4rails_address
    "#{street_address}, #{city}, #{state}, #{zipcode}"    
  end
  
  def self.geocoded_crimes
    geo_data = []

    Crime.by_location.each do |crime|
      geo_data << { lat:crime.latitude, lng:crime.longitude, count:Random.rand(100..100)  }
    end

    geo_data
  end

  def self.by_location
    all(:select => "latitude, longitude", :group => "latitude, longitude")
  end
end
