require 'rails_helper'


feature 'Create student' do

  let(:advisor){ create(:advisor) }

  before do
    sign_in(advisor)
    visit angular_app_index_path
  end

  context 'on students page' do
    scenario 'open page', js: true do
      expect(advisor.is_admin).to be_truthy
      save_and_open_page
    end
  end

end
