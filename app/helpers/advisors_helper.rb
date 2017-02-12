module AdvisorsHelper

  def advisor_status(advisor)
    unless current_advisor == advisor
      render partial: 'update_advisor_status', locals: { advisor: advisor }
    end
  end

  def advisor_deletion(advisor)
    unless current_advisor == advisor
      render partial: "delete_advisor", locals: { advisor: advisor }
    end
  end

end
