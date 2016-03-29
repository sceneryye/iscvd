module SessionsHelper
  def login user
    session[:user_id] = user.id
  end

  def login?
    current_user.present?
  end

  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user ||= User.find_by(id: user_id)
      if user && user.authenticated(:remember, cookies[:remember_toekn])
        login user
        @current_user ||= user
      end
    end
  end

  def logout
    forget current_user
    @current_user = nil
    session.delete(:user_id)
  end

  def remember user
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  def forget user
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end
end
