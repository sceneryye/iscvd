json.array!(@meetings) do |meeting|
  json.extract! meeting, :id, :name, :email, :password, :password_digest, :weixin_openid, :weixin_nickname, :meetingname, :role, :avatar, :mobile, :sex
  json.url meeting_url(meeting, format: :json)
end
