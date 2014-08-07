class AutocompleteController < ApplicationController

  def show
    response = {
      :suggestions => ["United Arab Emirates", "United Kingdom", "United States"]
      }.to_json
    
    respond_to do |format|
      format.json { render json: response}
    end
  end

end