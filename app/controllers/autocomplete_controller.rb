class AutocompleteController < ApplicationController

  def show
    cities = City.all.collect(&:name)
    response = { 
      suggestions: cities 
    }.to_json
    
    respond_to do |format|
      format.json { render json: response}
    end
  end

end