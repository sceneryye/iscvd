class ChangeColumnToMaillog < ActiveRecord::Migration
  def change
    remove_column :maillogs, :type
    add_column :maillogs, :sending_type, :string
  end
end
