class PagesController < ApplicationController
  def home
  	def facebook_profile
  if current_user.oauth_token
        @graph = Koala::Facebook::API.new(current_user.oauth_token)
        @profile = @graph.get_object("me")
        @picture = @graph.get_picture("me")
        @feed = @graph.get_connections("me","feed")
        @friends = @graph.get_connections("me", "friends")
    else
        redirect_to "/"
    end
end
 
  end

  def about
  end

  def contact
  end

  def index


end
  
end
