json.array!(@users) do |user|
  json.extract! user, :id, :name, :email, :password, :password_digest, :username, :role, :avatar, :mobile, :sex
  json.url user_url(user, format: :json)
end
