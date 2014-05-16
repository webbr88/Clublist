class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  
	devise :omniauthable
  	devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

   has_many :reservations
   has_many :payments
   has_many :tables, :through => :reservations
   has_many :tables, :through => :payments

def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
          return user if user
            user = User.create(  name:auth.extra.raw_info.name,
                                 provider:auth.provider,
                                 uid:auth.uid,
                                 email:auth.info.email,
                                 oauth_token:auth.credentials.token,
                                 password:Devise.friendly_token[0,20]
                                 )

      
      end
  end
