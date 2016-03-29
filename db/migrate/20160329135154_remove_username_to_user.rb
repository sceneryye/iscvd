class RemoveUsernameToUser < ActiveRecord::Migration
  def change
    remove_column :users, :username, :mobile
  end
end
