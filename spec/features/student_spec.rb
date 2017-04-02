require 'rails_helper'


feature 'Create student' do

  let(:advisor){ create(:advisor) }

  before do
    sign_in(advisor)
    visit 'http://localhost:3000/#!/students'
  end

  context 'on students page' do
    scenario 'open page', js: true do
      save_and_open_page
    end
  end

end
