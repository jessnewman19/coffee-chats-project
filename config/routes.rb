Rails.application.routes.draw do
  resources :meetings
  resources :professionals
  resources :users
  resources :industries

  post '/user/signup', to: 'users#create'
  post '/professional/signup', to: 'professionals#create'
  
  post '/professional/login', to: 'professional_sessions#create'

  get '/me', to: 'users#show'
  get '/professional/me', to: 'professionals#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: "sessions#destroy"

  # Leave to deploy app to Heroku
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end
