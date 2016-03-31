class User < ActiveRecord::Base
  has_secure_password
  before_save :downcase_email
  before_create :create_activation_digest
  validates :email, presence: {message: '邮箱不能为空!'}, uniqueness: {message: '邮箱已被占用!'}
  validates :role, presence: true
  validates :sex, presence: true
  attr_accessor :remember_token, :activation_token

  def self.digest string
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  def authenticated? attribute, token
    digest = send("#{attribute}_digest")
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end

  def forget
    update_attribute(:remember_digest, nil)
  end

  def activated?
    self.activated == true
  end

  def self.admin_authenticate(email,password)
    use = self.where(:email=>email,:role=>'0').first
    if use
      if use.password_digest[0] == "s"
        encrypt = "s" + Digest::MD5.hexdigest("#{Digest::MD5.hexdigest(password)}#{name}#{use.createtime}")[0..30]
        return use if encrypt == use.password_digest
      else
        return use if Digest::MD5.hexdigest(password) == use.password_digest
      end
    end
    nil
  end

  private

  def create_activation_digest
    self.activation_token = User.new_token
    self.activation_digest = User.digest(activation_token)
  end

  def downcase_email
    self.email = email.downcase
  end

end
