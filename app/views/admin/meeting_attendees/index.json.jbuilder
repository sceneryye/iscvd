json.array!(@meeting_attendees) do |meeting_attendee|
  json.extract! meeting_attendee, :id, :name, :email, :password, :password_digest, :weixin_openid, :weixin_nickname, :meeting_attendeename, :role, :avatar, :mobile, :sex
  json.url meeting_attendee_url(meeting_attendee, format: :json)
end
